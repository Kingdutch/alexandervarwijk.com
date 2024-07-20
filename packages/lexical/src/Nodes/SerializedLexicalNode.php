<?php

declare(strict_types=1);

namespace Kingdutch\Lexical\Nodes;

/**
 */
readonly abstract class SerializedLexicalNode {

  public function __construct(
    public string $type,
    public string $version,
  ) {
  }

}
