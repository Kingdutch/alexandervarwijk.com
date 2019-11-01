/**
 * @file
 * Renders a list of recent blogposts.
 *
 */

import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

const Grid = styled.div`
  @media (min-width: 520px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem;
  }
  
  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Post = styled.article`
  margin-bottom: 2rem;
`;

function RecentBlogPosts() {
  const { allPostConnection } = useStaticQuery(
    graphql`
      query {
        allPostConnection: allMarkdownRemark(
          filter: { fields: { collection: { eq: "blog" } } }
          limit: 10
        ) {
          nodes {
            id
            frontmatter {
              title
              date(formatString: "MMMM Do, YYYY")
              tags
              featuredImage {
                childImageSharp {
                  sizes(maxWidth: 300) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    `
  );

  const posts = allPostConnection.nodes.map(post => (
    <Post key={post.id}>
      <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
      <h3><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h3>
      <div>{post.excerpt}</div>
      <time>{post.frontmatter.date}</time>
    </Post>
  ));

  return (
    <Grid>
      {posts}
    </Grid>
  );
}

export default RecentBlogPosts;
