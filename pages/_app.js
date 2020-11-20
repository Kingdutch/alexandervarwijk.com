import Layout from "../lib/components/layout";
import '../lib/components/layout.css';

export default function App({Component, pageProps}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
