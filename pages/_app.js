import Layout from "../components/layout";
import '../components/layout.css';

export default function App({Component, pageProps}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
