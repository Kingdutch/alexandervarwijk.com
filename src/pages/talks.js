import React from 'react';

import { useStaticQuery, graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Blog = () => {
  const { allTalksConnection } = useStaticQuery(
    graphql`
      query {
        allTalksConnection: allMarkdownRemark(
          filter: { fields: { collection: { eq: "talks" } } }
          sort: {fields:frontmatter___date, order:DESC}
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                description
                date(formatString: "MMMM Do, YYYY")
                conference
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  const talks = allTalksConnection.edges.map(({ node: talk }) => (
    <article key={talk.id} style={{ marginTop: '1rem' }}>
      <div>{talk.frontmatter.date}, {talk.frontmatter.conference}</div>
      <h2>
        <Link to={talk.fields.slug}>{talk.frontmatter.title}</Link>
      </h2>
      <div>
        {talk.frontmatter.description}
      </div>
    </article>
  ));

  return (
    <Layout>
      <SEO title="Talks" />
      <h1>Talks</h1>
      <div>Below is an overview of the talks that I have given at meetups and conferences.</div>
      {talks}
    </Layout>
  );
};

export default Blog;
