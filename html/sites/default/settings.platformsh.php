<?php

/**
 * @file
 * Platform.sh settings.
 */

use Drupal\Core\Installer\InstallerKernel;

// Configure any external services hosted on PlatformSH.
if (isset($_ENV['PLATFORM_RELATIONSHIPS'])) {
  $relationships = json_decode(base64_decode($_ENV['PLATFORM_RELATIONSHIPS']), TRUE, 512, JSON_THROW_ON_ERROR);

  // Configure the database.
  if (empty($databases['default']['default']) && !empty($relationships['database'])) {
    foreach ($relationships['database'] as $endpoint) {
      $database = [
        'driver' => $endpoint['scheme'],
        'database' => $endpoint['path'],
        'username' => $endpoint['username'],
        'password' => $endpoint['password'],
        'host' => $endpoint['host'],
        'port' => $endpoint['port'],
      ];
      if (!empty($endpoint['query']['compression'])) {
        $database['pdo'][PDO::MYSQL_ATTR_COMPRESS] = TRUE;
      }
      if (!empty($endpoint['query']['is_master'])) {
        $databases['default']['default'] = $database;
      }
      else {
        $databases['default']['replica'][] = $database;
      }
    }
  }

  // Configure the Redis caches.
  // Docs: https://docs.platform.sh/configuration/services/redis.html
  if (!empty($relationships['redis'][0]) && !InstallerKernel::installationAttempted() && extension_loaded('redis')) {
    $credentials = $relationships['redis'][0];

    // Set Redis as the default backend for any cache bin not otherwise
    // specified.
    $settings['cache']['default'] = 'cache.backend.redis';
    $settings['cache']['bins']['bootstrap'] = 'cache.backend.chainedfast';
    $settings['cache']['bins']['config'] = 'cache.backend.chainedfast';
    $settings['cache']['bins']['discovery'] = 'cache.backend.chainedfast';
    $settings['redis.connection']['host'] = $credentials['host'];
    $settings['redis.connection']['port'] = $credentials['port'];

    // Set Redis to not get the cache_form (no performance difference).
    $settings['cache']['bins']['form'] = 'cache.backend.database';

    // Allow the services to work before the Redis module itself is enabled.
    $settings['container_yamls'][] = 'modules/contrib/redis/redis.services.yml';
    $settings['container_yamls'][] = 'sites/default/platformsh.redis.services.yml';

    // Manually add the classloader path, this is required for the container
    // cache bin definition below and allows to use it without the redis module
    // being enabled.
    $class_loader->addPsr4('Drupal\\redis\\', 'modules/contrib/redis/src');

    // Use redis for container cache.
    // The container cache is used to load the container definition itself, and
    // thus any configuration stored in the container itself is not available
    // yet. These lines force the container cache to use Redis rather than the
    // default SQL cache.
    $settings['bootstrap_container_definition'] = [
      'parameters' => [],
      'services' => [
        'redis.factory' => [
          'class' => 'Drupal\redis\ClientFactory',
        ],
        'cache.backend.redis' => [
          'class' => 'Drupal\redis\Cache\CacheBackendFactory',
          'arguments' => [
            '@redis.factory',
            '@cache_tags_provider.container',
            '@serialization.phpserialize',
          ],
        ],
        'cache.container' => [
          'class' => '\Drupal\redis\Cache\PhpRedis',
          'factory' => ['@cache.backend.redis', 'get'],
          'arguments' => ['container'],
        ],
        'cache_tags_provider.container' => [
          'class' => 'Drupal\redis\Cache\RedisCacheTagsChecksum',
          'arguments' => ['@redis.factory'],
        ],
        'serialization.phpserialize' => [
          'class' => 'Drupal\Component\Serialization\PhpSerialize',
        ],
      ],
    ];
  }

  // Configure SOLR if it's present.
  // Docs: https://docs.platform.sh/configuration/services/solr.html
  if (!empty($relationships['solr'][0])) {
    $credentials = $relationships['solr'][0];
    // This assumes usage of the solr server created by the social_search_solr
    // module.
    [$path, $core] = explode('/', $credentials['path'], 2);
    $config['search_api.server.social_solr'] = [
      'backend_config' => [
        'connector_config' => [
          'host' => $credentials['host'],
          'path' => '/',
          'core' => $core,
          'port' => $credentials['port'],
        ],
      ],
    ];
  }
}

if (isset($_ENV['PLATFORM_APP_DIR'])) {
  // Configure private and temporary file paths.
  if (!isset($settings['file_private_path'])) {
    $settings['file_private_path'] = $_ENV['PLATFORM_APP_DIR'] . '/files_private';
  }
  if (!isset($config['system.file']['path']['temporary'])) {
    $config['system.file']['path']['temporary'] = $_ENV['PLATFORM_APP_DIR'] . '/tmp';
  }
  // Configure the default PhpStorage and Twig template cache directories.
  if (!isset($settings['php_storage']['default'])) {
    $settings['php_storage']['default']['directory'] = $settings['file_private_path'];
  }
  if (!isset($settings['php_storage']['twig'])) {
    $settings['php_storage']['twig']['directory'] = $settings['file_private_path'];
  }
}

if (isset($_ENV['PLATFORM_ROUTES'])) {
  $routes = json_decode(base64_decode($_ENV['PLATFORM_ROUTES']), TRUE);

  // Set trusted hosts based on Platform.sh routes.
  if (!isset($settings['trusted_host_patterns'])) {
    $settings['trusted_host_patterns'] = [];
    foreach ($routes as $url => $route) {
      $host = parse_url($url, PHP_URL_HOST);
      if ($host !== FALSE && $route['type'] === 'upstream' && $route['upstream'] === $_ENV['PLATFORM_APPLICATION_NAME']) {
        $settings['trusted_host_patterns'][] = '^' . preg_quote($host) . '$';
      }
    }
    $settings['trusted_host_patterns'] = array_unique($settings['trusted_host_patterns']);
  }
}

// Import variables prefixed with 'd8settings:' into $settings and 'd8config:'
// into $config.
if (isset($_ENV['PLATFORM_VARIABLES'])) {
  $variables = json_decode(base64_decode($_ENV['PLATFORM_VARIABLES']), TRUE);
  foreach ($variables as $name => $value) {
    // A variable named "drupalsettings:example-setting" will be saved in
    // $settings['example-setting'].
    if (strpos($name, 'drupalsettings:') === 0) {
      $settings[substr($name, 15)] = $value;
    }
    // A variable named "drupalconfig:example-name:example-key" will be saved in
    // $config['example-name']['example-key'].
    elseif (strpos($name, 'drupalconfig:') === 0 && substr_count($name, ':') >= 2) {
      [, $config_key, $config_name] = explode(':', $name, 3);
      $config[$config_key][$config_name] = $value;
    }
    // A complex variable named "drupalconfig:example-name" will be saved in
    // $config['example-name'].
    elseif (strpos($name, 'drupalconfig:') === 0 && is_array($value)) {
      $config[substr($name, 13)] = $value;
    }
  }
}
// Set the project-specific entropy value, used for generating one-time
// keys and such.
if (isset($_ENV['PLATFORM_PROJECT_ENTROPY']) && empty($settings['hash_salt'])) {
  $settings['hash_salt'] = $_ENV['PLATFORM_PROJECT_ENTROPY'];
}

// We add the services that only run on platform.
if (isset($_ENV['PLATFORM_PROJECT'])) {
  $settings['container_yamls'][] = __DIR__ . '/platformsh.services.yml';
}
