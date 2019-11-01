/**
 * @file
 * Renders a talk.
 *
 */

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({ data }) => {
  const talk = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={talk.frontmatter.title}
        description={talk.frontmatter.description}
      />
      <article>
        <h1>{talk.frontmatter.title}</h1>
        <time>{talk.frontmatter.date}</time>
        <div dangerouslySetInnerHTML={{ __html: talk.html }} />
        <div dangerouslySetInnerHTML={{ __html: talk.frontmatter.slides }} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM Do, YYYY")
        conference
        slides
      }
    }
  }
`;
