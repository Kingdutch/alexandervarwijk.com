<?php

declare(strict_types=1);

namespace Drupal\av_mcp\Plugin\mcp_server\Tool;

use Drupal\av_mcp\ContentSerializer;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Access\AccessResultInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\mcp_server\Plugin\ToolPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Shared plumbing for the tools that read site content.
 */
abstract class ContentToolBase extends ToolPluginBase {

  /**
   * The node types that are exposed to MCP clients.
   */
  protected const NODE_TYPES = ['post', 'page', 'talk', 'resource'];

  protected EntityTypeManagerInterface $entityTypeManager;

  protected ContentSerializer $serializer;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->entityTypeManager = $container->get('entity_type.manager');
    $instance->serializer = $container->get(ContentSerializer::class);
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  protected function defaultConfiguration(): array {
    // Tools ship disabled in mcp_server; ours should be available as soon as
    // the module is enabled.
    return ['enabled' => TRUE];
  }

  /**
   * {@inheritdoc}
   */
  public function checkAccess(AccountInterface $account): AccessResultInterface {
    return AccessResult::allowedIfHasPermission($account, 'access content');
  }

}
