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
    grid-gap: 1rem 2rem;
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Post = styled.article`
  margin-top: 1rem;
`;

const ResponsivePost = styled.article`
  margin-top: 2rem;

  @media (min-width: 720px) {
    display: flex;

    .gatsby-image-wrapper {
      flex: 200px 1 0;
      margin-right: 1rem;
    }
  }
`;

const PostDetails = styled.div`
  margin-top: .25rem;
  
  ${({display}) => display === 'list' ? `
    @media (min-width: 720px) {
      margin-top: 0;
    }
  ` : null}
 `;

const Snippet = styled.div`
  margin-top: 1rem;
`;

function RecentBlogPosts({ display = 'grid', HeadingLevel = 'h3' }) {
  const { allPostConnection } = useStaticQuery(
    graphql`
      query {
        allPostConnection: allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { fields: { collection: { eq: "blog" } } }
          limit: 10
        ) {
          nodes {
            id
            frontmatter {
              title
              date(formatString: "MMMM Do, YYYY")
              tags
              description
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
          }
        }
      }
    `
  );

  const PostWrapper = display === 'list' ? ResponsivePost : Post;

  const posts = allPostConnection.nodes.map(post => (
    <PostWrapper key={post.id}>
      <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
      <PostDetails display={display}>
        <time>{post.frontmatter.date}</time>
        <HeadingLevel>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </HeadingLevel>
        <Snippet>{post.frontmatter.description}</Snippet>
      </PostDetails>
    </PostWrapper>
  ));

  return display === 'list' ? posts : <Grid>{posts}</Grid>;
}

export default RecentBlogPosts;
