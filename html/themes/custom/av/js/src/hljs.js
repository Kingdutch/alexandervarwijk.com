import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import diff from 'highlight.js/lib/languages/diff';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import reasonml from 'highlight.js/lib/languages/reasonml';
import rust from 'highlight.js/lib/languages/rust';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';
import 'highlight.js/styles/github.css';

(function (Drupal, drupalSettings) {
  Drupal.behaviors.hljs = {
    attach: async function (context) {
      hljs.registerLanguage('bash', bash);
      hljs.registerLanguage('diff', diff);
      hljs.registerLanguage('javascript', javascript);
      hljs.registerLanguage('php', php);
      hljs.registerLanguage('reasonml', reasonml);
      hljs.registerLanguage('rust', rust);
      hljs.registerLanguage('shell', shell);
      hljs.registerLanguage('sql', sql);
      hljs.registerLanguage('typescript', typescript);
      hljs.registerLanguage('yaml', yaml);

      hljs.highlightAll();
    }
  }
})(Drupal, drupalSettings);
