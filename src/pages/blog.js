import React from 'react';

import { useStaticQuery, graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Blog = () => {
  const { allPostsConnection } = useStaticQuery(
    graphql`
      query {
        allPostsConnection: allMarkdownRemark(
          filter: { fields: { collection: { eq: "blog" } } }
          limit: 20
        ) {
          edges {
            post: node {
              id
              frontmatter {
                title
                date(formatString: "MMMM Do, YYYY")
              }
              fields {
                slug
              }
              excerpt
            }
          }
        }
      }
    `
  );

  const blogPosts = allPostsConnection.edges.map(({ post }) => (
    <div key={post.id}>
      <div>
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </div>
      <div>{post.frontmatter.date}</div>
      <div>{post.excerpt}</div>
    </div>
  ));

  return (
    <Layout>
      <SEO title="Posts" />
      <h1>Posts</h1>
      {blogPosts}
    </Layout>
  );
};

export default Blog;
