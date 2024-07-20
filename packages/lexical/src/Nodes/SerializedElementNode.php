<?php

declare(strict_types=1);

namespace Kingdutch\Lexical\Nodes;

/**
 * @template T of \Kingdutch\Lexical\Nodes\SerializedLexicalNode
 */
readonly class SerializedElementNode extends SerializedLexicalNode {

  /**
   * @param string $type
   * @param string $version
   * @param array<T> $children
   * @param "ltr"|"rtl"|null $direction
   * @param \Kingdutch\Lexical\Nodes\ElementFormatType $format
   * @param positive-int $indent
   */
  public function __construct(
    string $type,
    string $version,
    public array $children,
    public ?string $direction,
    public ElementFormatType $format,
    public int $indent,
  ) {
    parent::__construct($type, $version);
  }

}
