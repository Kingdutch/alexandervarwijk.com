/**
 * @file
 * Renders a list of recent blogposts.
 *
 */

import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import GatsbyImg from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ConvertKitNewsletter from "../components/forms/ConvertKitNewsletter";

const Img = styled(GatsbyImg)`
  margin-top: 1rem;
`

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        meta={[
          {
            name: 'image',
            property: 'og:image',
            content:
              data.site.siteMetadata.siteUrl +
              post.frontmatter.featuredImage.childImageSharp.sizes.src,
          },
          {
            name: 'twitter:image',
            content:
              data.site.siteMetadata.siteUrl +
              post.frontmatter.featuredImage.childImageSharp.sizes.src,
          },
        ]}
      />
      <article>
        <h1>{post.frontmatter.title}</h1>
        <time>{post.frontmatter.date}</time>
        <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <ConvertKitNewsletter />
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
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
