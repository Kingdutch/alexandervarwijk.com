/**
 * @file
 * Renders a list of recent blogposts.
 *
 */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

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

  return allPostConnection.nodes.map(post => (
    <div key={post.id}>
      <div>
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </div>
      <div>{post.frontmatter.date}</div>
      <div>{post.excerpt}</div>
    </div>
  ));
}

export default RecentBlogPosts;
