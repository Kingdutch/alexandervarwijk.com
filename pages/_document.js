import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            key="main"
            async
            src={'//visit.alexandervarwijk.com/hello.js'}
          ></script>,
          <noscript>
            <img src={'//visit.alexandervarwijk.com/image.gif'} alt={''} />
          </noscript>
        </body>
      </Html>
    )
  }
}

export default Document
