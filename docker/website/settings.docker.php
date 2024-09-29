<?php

// phpcs:ignoreFile
/**
 * @file
 * This settings file exists to make the website images work with
 * connection information provided through environment variables (for example
 * in AWS).
 *
 * This file makes use of the null-coalesce operator (`??`) to indicate
 * optional values.
 *
 * If this file exists in docker it's loaded by the main `settings.php` file.
 */

$settings['file_private_path'] = $_ENV["WEBSITE_PRIVATE_FILE_PATH"] ?? '/app/files_private';

$settings['hash_salt'] = $_ENV["WEBSITE_PROJECT_ENTROPY"];

$databases['default']['default'] = [
  'database' => $_ENV["WEBSITE_DATABASE"],
  'username' => $_ENV["WEBSITE_DATABASE_USERNAME"],
  'password' => $_ENV["WEBSITE_DATABASE_PASSWORD"],
  'prefix' => '',
  'host' => $_ENV["WEBSITE_DATABASE_HOST"],
  'port' => $_ENV["WEBSITE_DATABASE_PORT"],
  'driver' => 'mysql',
];
// @todo We need to adjust the above environment variables so that we can add
// read-only replica configuration to the `$databases['default']['replica']`
// array.
