import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import RecentBlogPosts from "../components/RecentBlogPosts";

const Blog = () => {
  return (
    <Layout>
      <SEO title="Posts" />
      <h1>Posts</h1>
      <RecentBlogPosts display="list" HeadingLevel={"h2"} />
    </Layout>
  );
};

export default Blog;
