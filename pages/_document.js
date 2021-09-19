import crypto from 'crypto';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

/**
 * Creates a CSP hash value of a script.
 *
 * @param {string} text
 *   The script to create a hash for.
 * @return {string}
 *   The directive to add to the CSP header.
 */
const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256').update(text).digest('base64');
  return `'sha256-${hash}'`;
};

/**
 * Get a CSP header for the current properties.
 *
 * @param props
 *   The documennt props to get a CSP header for.
 * @return {string}
 *   The value of a CSP header.
 */
const getCsp = (props) => {
  const cspHash = cspHashOf(NextScript.getInlineScriptSource(props));
  return "default-src 'self' https://visit.alexandervarwijk.com https://*.convertkit.com https://alexandervarwijk.ck.page; frame-src https://www.slideshare.net https://www.youtube.com; frame-ancestors: 'none'; " +
    process.env.NODE_ENV ===
    'production'
    ? `script-src 'self' https://visit.alexandervarwijk.com https://*.convertkit.com https://alexandervarwijk.ck.page ${cspHash}`
    : `style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'unsafe-eval' 'self' https://visit.alexandervarwijk.com https://*.convertkit.com https://alexandervarwijk.ck.page ${cspHash}`;
};

class Document extends NextDocument {
  render() {
    const csp = getCsp(this.props);

    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body className="dark:bg-black dark:text-gray-300">
          <Main />
          <NextScript />
          <script
            key="main"
            async
            src={'//visit.alexandervarwijk.com/hello.js'}
          ></script>
          <noscript>
            <img src={'//visit.alexandervarwijk.com/image.gif'} alt={''} />
          </noscript>
        </body>
      </Html>
    );
  }
}

export default Document;
