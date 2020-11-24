import Layout from "../components/layout";
import "../styles.css"
import {AnimateSharedLayout} from "framer-motion";
import React from "react";

export default function App({Component, pageProps}) {
  return (
    <AnimateSharedLayout>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimateSharedLayout>
  );
}
