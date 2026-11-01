<?php

declare(strict_types=1);

namespace Drupal\av_mcp;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\FieldableEntityInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\file\FileInterface;
use Drupal\layout_builder\SectionComponent;
use Drupal\node\NodeInterface;

/**
 * Turns nodes into plain arrays that can be handed to an AI assistant.
 */
final class ContentSerializer {

  /**
   * Field types that only hold editorial tooling state, not content.
   */
  private const IGNORED_FIELD_TYPES = ['yoast_seo'];

  public function __construct(
    private readonly EntityTypeManagerInterface $entityTypeManager,
    private readonly FileUrlGeneratorInterface $fileUrlGenerator,
  ) {}

  /**
   * The metadata used to identify a node in listings.
   */
  public function summarize(NodeInterface $node): array {
    return [
      'id' => (int) $node->id(),
      'type' => $node->bundle(),
      'title' => $node->label(),
      'status' => $node->isPublished() ? 'published' : 'unpublished',
      'url' => $node->toUrl('canonical', ['absolute' => TRUE])->toString(),
      'created' => date('c', (int) $node->getCreatedTime()),
      'changed' => date('c', (int) $node->getChangedTime()),
      'author' => $node->getOwner()?->getDisplayName(),
    ];
  }

  /**
   * The metadata and all content fields of a node.
   */
  public function serialize(NodeInterface $node, AccountInterface $account): array {
    return $this->summarize($node) + [
      'fields' => $this->serializeFields($node, $account),
    ];
  }

  /**
   * Serializes the configurable (non-base) fields of an entity.
   */
  private function serializeFields(FieldableEntityInterface $entity, AccountInterface $account): array {
    $fields = [];
    foreach ($entity->getFields(FALSE) as $name => $items) {
      $definition = $items->getFieldDefinition();
      if ($definition->getFieldStorageDefinition()->isBaseField()) {
        continue;
      }
      if (in_array($definition->getType(), self::IGNORED_FIELD_TYPES, TRUE)) {
        continue;
      }
      // Layout Builder forbids viewing its layout field directly because it
      // is only meant to be rendered; the components are checked instead.
      if ($items->isEmpty() || ($definition->getType() !== 'layout_section' && !$items->access('view', $account))) {
        continue;
      }
      $values = $this->serializeItems($items, $account);
      if ($values === []) {
        continue;
      }
      $fields[$name] = [
        'label' => (string) $definition->getLabel(),
        'type' => $definition->getType(),
        'values' => $values,
      ];
    }
    return $fields;
  }

  /**
   * Serializes the items of a single field.
   */
  private function serializeItems(FieldItemListInterface $items, AccountInterface $account): array {
    $values = [];
    foreach ($items as $item) {
      $values[] = match ($items->getFieldDefinition()->getType()) {
        'text', 'text_long', 'text_with_summary' => array_filter([
          'value' => $item->value,
          'summary' => $item->summary ?? NULL,
          'format' => $item->format,
        ]),
        'string', 'string_long' => $item->value,
        'link' => array_filter([
          'uri' => $item->uri,
          'title' => $item->title,
        ]),
        'entity_reference', 'image', 'file' => $this->serializeReference($item, $account),
        'layout_section' => $this->serializeSection($item->section, $account),
        default => $item->getValue(),
      };
    }
    return array_values(array_filter($values, fn ($value) => $value !== NULL && $value !== []));
  }

  /**
   * Serializes a referenced entity as a compact description.
   */
  private function serializeReference(object $item, AccountInterface $account): ?array {
    $entity = $item->entity;
    if ($entity === NULL || !$entity->access('view', $account)) {
      return NULL;
    }
    $value = [
      'entity_type' => $entity->getEntityTypeId(),
      'id' => $entity->id(),
      'label' => $entity->label(),
    ];
    if ($entity instanceof FileInterface) {
      $value['url'] = $this->fileUrlGenerator->generateAbsoluteString($entity->getFileUri());
    }
    if (isset($item->alt)) {
      $value['alt'] = $item->alt;
    }
    return $value;
  }

  /**
   * Serializes a Layout Builder section, including inline block content.
   */
  private function serializeSection(object $section, AccountInterface $account): array {
    return [
      'layout' => $section->getLayoutId(),
      'components' => array_values(array_map(
        fn (SectionComponent $component) => $this->serializeComponent($component, $account),
        $section->getComponents(),
      )),
    ];
  }

  /**
   * Serializes a Layout Builder component.
   *
   * Pages store their copy in inline blocks, so those are expanded into their
   * fields rather than only naming the block plugin.
   */
  private function serializeComponent(SectionComponent $component, AccountInterface $account): array {
    $configuration = $component->get('configuration');
    $value = array_filter([
      'region' => $component->getRegion(),
      'plugin' => $component->getPluginId(),
      'label' => $configuration['label'] ?? NULL,
    ]);

    $block = NULL;
    if (!empty($configuration['block_revision_id'])) {
      $block = $this->entityTypeManager->getStorage('block_content')->loadRevision($configuration['block_revision_id']);
    }
    elseif (str_starts_with($component->getPluginId(), 'block_content:')) {
      $uuid = substr($component->getPluginId(), strlen('block_content:'));
      $blocks = $this->entityTypeManager->getStorage('block_content')->loadByProperties(['uuid' => $uuid]);
      $block = reset($blocks) ?: NULL;
    }

    if ($block instanceof FieldableEntityInterface) {
      $value['fields'] = $this->serializeFields($block, $account);
    }
    return $value;
  }

}
