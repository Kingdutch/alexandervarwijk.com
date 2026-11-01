<?php

declare(strict_types=1);

namespace Drupal\av_mcp\Plugin\mcp_server\Tool;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mcp_server\Attribute\Tool;
use Drupal\node\NodeInterface;
use Drupal\path_alias\AliasManagerInterface;
use Mcp\Exception\ToolCallException;
use Mcp\Server\ClientGateway;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Returns the full content of a single post, page, talk or resource.
 */
#[Tool(
  id: 'get_content',
  label: new TranslatableMarkup('Get content'),
  description: new TranslatableMarkup('Returns the full content of a blog post, page, talk or resource on alexandervarwijk.com, including its body HTML, SEO fields and, for pages, the text of the blocks in its layout. Look up content by its numeric id or by its URL or path.'),
  inputSchema: [
    'type' => 'object',
    'properties' => [
      'id' => [
        'type' => 'integer',
        'description' => 'The id of the content, as returned by list_content.',
      ],
      'url' => [
        'type' => 'string',
        'description' => 'The URL or path of the content, for example "https://www.alexandervarwijk.com/blog/my-post" or "/blog/my-post".',
      ],
    ],
  ],
  readOnly: TRUE,
  destructive: FALSE,
  idempotent: TRUE,
  openWorld: FALSE,
)]
final class GetContent extends ContentToolBase {

  private AliasManagerInterface $aliasManager;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->aliasManager = $container->get('path_alias.manager');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function execute(array $arguments, ClientGateway $gateway): mixed {
    if (!isset($arguments['id']) && ($arguments['url'] ?? '') === '') {
      throw new ToolCallException('Provide either an "id" or a "url".');
    }

    $id = $arguments['id'] ?? $this->idFromUrl($arguments['url']);
    $node = $id !== NULL ? $this->entityTypeManager->getStorage('node')->load($id) : NULL;
    // Don't reveal whether content exists when the account can't view it.
    if (!$node instanceof NodeInterface || !in_array($node->bundle(), self::NODE_TYPES, TRUE) || !$node->access('view', $this->currentUser)) {
      throw new ToolCallException(sprintf('No content found for "%s".', $arguments['url'] ?? $id));
    }

    return $this->serializer->serialize($node, $this->currentUser);
  }

  /**
   * Resolves a URL, alias or system path to a node id.
   */
  private function idFromUrl(string $url): ?int {
    $path = '/' . ltrim(parse_url($url, PHP_URL_PATH) ?? '', '/');
    $path = $this->aliasManager->getPathByAlias($path);
    return preg_match('#^/node/(\d+)$#', $path, $matches) ? (int) $matches[1] : NULL;
  }

}
