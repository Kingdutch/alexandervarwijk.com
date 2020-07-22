/**
 * @file
 * Renders a teaser of the single most recent blogpost.
 */

import React from 'react';
import styled from 'styled-components';
import {graphql, Link, useStaticQuery} from 'gatsby';
import Img from 'gatsby-image';

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

function LatestBlogPost({ HeadingLevel = 'h3' }) {
  // TODO: This query is similar to what's used in RecentBlogPosts so these
  //    components should be refactored.
  const { allPostConnection } = useStaticQuery(
    graphql`
        query {
            allPostConnection: allMarkdownRemark(
                sort: { fields: frontmatter___date, order: DESC }
                filter: { fields: { collection: { eq: "blog" } } }
                limit: 1
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

  return allPostConnection.nodes.map(post => (
    <ResponsivePost key={post.id}>
      <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes}/>
      <PostDetails display={'list'}>
        <time>{post.frontmatter.date}</time>
        <HeadingLevel>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </HeadingLevel>
        <Snippet>{post.frontmatter.description}</Snippet>
      </PostDetails>
    </ResponsivePost>
  ));
}

export default LatestBlogPost;
