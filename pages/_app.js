import React from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import Layout from '../components/layout';
import Script from "next/script";

import '../styles/global.css';
import '../styles/prism-darcula.css';

export default function App({ Component, pageProps }) {
  return (
    <AnimateSharedLayout>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </AnimateSharedLayout>
  );
}
