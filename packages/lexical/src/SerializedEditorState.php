<?php

declare(strict_types=1);

namespace Kingdutch\Lexical;

use Kingdutch\Lexical\Nodes\SerializedRootNode;

/**
 * @template T of \Kingdutch\Lexical\Nodes\SerializedLexicalNode
 */
readonly class SerializedEditorState {

  /**
   * @param \Kingdutch\Lexical\Nodes\SerializedRootNode<T> $root
   */
  public function __construct(
    public SerializedRootNode $root,
  ) {
  }

}
