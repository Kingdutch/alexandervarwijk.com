import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Blog = () => {
  const { allResourcesConnection } = useStaticQuery(
    graphql`
      query {
        allResourcesConnection: allMarkdownRemark(
          filter: { fields: { collection: { eq: "resources" } } }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                url
                date(formatString: "MMMM Do, YYYY")
                tags
              }
              html
            }
          }
        }
      }
    `
  );

  console.log(allResourcesConnection);

  const resources = allResourcesConnection.edges.map(({ node: resource }) => (
    <div key={resource.id} style={{ marginTop: '1rem' }}>
      <div>{resource.frontmatter.tags.join(', ')}</div>
      <h2>
        <a href={resource.frontmatter.url}>{resource.frontmatter.title}</a>
      </h2>
      <div dangerouslySetInnerHTML={{ __html: resource.html }} />
    </div>
  ));

  return (
    <Layout>
      <SEO title="Posts" />
      <h1>Resources</h1>
      <div>Below is a selection of my bookmarks for quick reference.</div>
      {resources}
    </Layout>
  );
};

export default Blog;
