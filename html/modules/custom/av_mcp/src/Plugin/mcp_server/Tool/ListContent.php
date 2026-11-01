<?php

declare(strict_types=1);

namespace Drupal\av_mcp\Plugin\mcp_server\Tool;

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mcp_server\Attribute\Tool;
use Drupal\node\NodeInterface;
use Mcp\Server\ClientGateway;

/**
 * Lists posts, pages, talks and resources on the site.
 */
#[Tool(
  id: 'list_content',
  label: new TranslatableMarkup('List content'),
  description: new TranslatableMarkup('Lists blog posts, pages, talks and resources on alexandervarwijk.com, newest first. Use get_content with the returned id to read the full content of an item.'),
  inputSchema: [
    'type' => 'object',
    'properties' => [
      'type' => [
        'type' => 'string',
        'enum' => self::NODE_TYPES,
        'description' => 'Only return content of this type. "post" is a blog post, "page" a landing page.',
      ],
      'status' => [
        'type' => 'string',
        'enum' => ['any', 'published', 'unpublished'],
        'default' => 'any',
        'description' => 'Filter on publication status. Unpublished content includes drafts.',
      ],
      'search' => [
        'type' => 'string',
        'description' => 'Only return content whose title or body contains this text.',
      ],
      'limit' => [
        'type' => 'integer',
        'minimum' => 1,
        'maximum' => 100,
        'default' => 25,
      ],
      'offset' => [
        'type' => 'integer',
        'minimum' => 0,
        'default' => 0,
      ],
    ],
  ],
  readOnly: TRUE,
  destructive: FALSE,
  idempotent: TRUE,
  openWorld: FALSE,
)]
final class ListContent extends ContentToolBase {

  /**
   * {@inheritdoc}
   */
  public function execute(array $arguments, ClientGateway $gateway): mixed {
    $limit = max(1, min(100, (int) ($arguments['limit'] ?? 25)));
    $offset = max(0, (int) ($arguments['offset'] ?? 0));

    $query = $this->entityTypeManager->getStorage('node')->getQuery()
      ->accessCheck(TRUE)
      ->condition('type', isset($arguments['type']) ? [$arguments['type']] : self::NODE_TYPES, 'IN')
      ->sort('created', 'DESC');

    match ($arguments['status'] ?? 'any') {
      'published' => $query->condition('status', NodeInterface::PUBLISHED),
      'unpublished' => $query->condition('status', NodeInterface::NOT_PUBLISHED),
      default => NULL,
    };

    if (($arguments['search'] ?? '') !== '') {
      $query->condition($query->orConditionGroup()
        ->condition('title', $arguments['search'], 'CONTAINS')
        ->condition('body.value', $arguments['search'], 'CONTAINS'));
    }

    // Entity queries don't filter unpublished nodes the account can't see, so
    // apply view access before paging. The site is small enough for this.
    $nodes = array_values(array_filter(
      $this->entityTypeManager->getStorage('node')->loadMultiple($query->execute()),
      fn (NodeInterface $node) => $node->access('view', $this->currentUser),
    ));

    return [
      'total' => count($nodes),
      'offset' => $offset,
      'items' => array_map(
        fn (NodeInterface $node) => $this->serializer->summarize($node),
        array_slice($nodes, $offset, $limit),
      ),
    ];
  }

}
