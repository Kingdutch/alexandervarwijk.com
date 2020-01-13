/**
 * @file
 * Renders a list of recent blogposts.
 *
 */

import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        meta={[
          {
            name: 'og:image',
            content: data.site.siteMetadata.siteUrl + post.frontmatter.featuredImage.childImageSharp.sizes.src
          },
          {
            name: 'twitter:image',
            content: data.site.siteMetadata.siteUrl + post.frontmatter.featuredImage.childImageSharp.sizes.src
          }
        ]}
      />
      <article>
        <h1>{post.frontmatter.title}</h1>
        <time>{post.frontmatter.date}</time>
        <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 960) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    },
    site {
        siteMetadata {
            siteUrl
        }
    },
  }
`;
