<?php

declare(strict_types=1);

namespace Kingdutch\Lexical\Nodes;

/**
 * @template T of \Kingdutch\Lexical\Nodes\SerializedLexicalNode
 * @extends \Kingdutch\Lexical\Nodes\SerializedElementNode<T>
 */
readonly class SerializedParagraphNode extends SerializedElementNode {

  public function __construct(
    string $type,
    string $version,
    array $children,
    ?string $direction,
    ElementFormatType $format,
    int $indent,
    public int $textFormat,
  ) {
    parent::__construct($type, $version, $children, $direction, $format, $indent);
  }

}
