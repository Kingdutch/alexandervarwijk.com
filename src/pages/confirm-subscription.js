import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LatestBlogPost from "../components/LatestBlogPost";

const IndexPage = () => (
  <Layout>
    <SEO title="Thank you" />
    <main>
      <section>
        <h1>Subscription confirmed!</h1>
        <p>
          Boom! You're officially confirmed and on the list.
          Expect some great emails headed your way in the near future.
          If you haven't done so already, be sure to read my newest post.
        </p>
        <LatestBlogPost HeadingLevel={'h2'} />
      </section>
    </main>
  </Layout>
);

export default IndexPage;
