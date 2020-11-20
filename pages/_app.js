import Layout from "../components/layout";
import "../styles.css"

export default function App({Component, pageProps}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
