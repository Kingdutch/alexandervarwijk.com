<?php

declare(strict_types=1);

namespace Drupal\av_mcp\EventSubscriber;

use Drupal\simple_oauth_server_metadata\Event\ResourceMetadataEvent;
use Drupal\simple_oauth_server_metadata\Event\ResourceMetadataEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Advertises the OAuth scope that MCP clients must request.
 *
 * MCP clients pick the scope to request from the protected resource metadata.
 * mcp_server_oauth only lists scopes of Tool API bridge tools, which we don't
 * use, so without this clients request no scope and authorization fails.
 */
final class ResourceMetadataSubscriber implements EventSubscriberInterface {

  /**
   * The simple_oauth.oauth2_scope that grants access to the MCP server.
   */
  public const SCOPE = 'mcp';

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      ResourceMetadataEvents::BUILD => 'onBuild',
    ];
  }

  /**
   * Adds the MCP scope to the supported scopes.
   */
  public function onBuild(ResourceMetadataEvent $event): void {
    $scopes = $event->metadata['scopes_supported'] ?? [];
    $event->addMetadataField('scopes_supported', array_values(array_unique([...$scopes, self::SCOPE])));
  }

}
