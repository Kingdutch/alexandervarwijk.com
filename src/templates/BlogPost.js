/**
 * @file
 * Renders a list of recent blogposts.
 *
 */

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div>{post.frontmatter.date}</div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;
