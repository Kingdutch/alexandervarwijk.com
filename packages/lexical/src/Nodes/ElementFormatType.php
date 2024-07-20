<?php

declare(strict_types=1);

namespace Kingdutch\Lexical\Nodes;

enum ElementFormatType : string {

  case Left = 'left';
  case Start = 'start';
  case Center = 'center';
  case Right = 'right';
  case End = 'end';
  case Justify = 'justify';
  case None = '';

}
