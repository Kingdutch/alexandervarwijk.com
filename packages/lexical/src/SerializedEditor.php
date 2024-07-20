<?php

declare(strict_types=1);

namespace Kingdutch\Lexical;

readonly class SerializedEditor {

  /**
   * @param \Kingdutch\Lexical\SerializedEditorState<\Kingdutch\Lexical\Nodes\SerializedLexicalNode> $editorState
   */
  public function __construct(
    public SerializedEditorState $editorState,
  ) {}

}
