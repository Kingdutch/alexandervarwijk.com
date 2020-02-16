import React from 'react';

import { useStaticQuery, graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Talks = () => {
  const { allTalksConnection } = useStaticQuery(
    graphql`
      query {
        allTalksConnection: allMarkdownRemark(
          filter: { fields: { collection: { eq: "talks" } } }
          sort: { fields: frontmatter___date, order: DESC }
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
      <div>
        {talk.frontmatter.date}, {talk.frontmatter.conference}
      </div>
      <h2>
        <Link to={talk.fields.slug}>{talk.frontmatter.title}</Link>
      </h2>
      <div>{talk.frontmatter.description}</div>
    </article>
  ));

  return (
    <Layout>
      <SEO
        title="Talks"
        description="An overview of the talks given by Alexander at meetups and conferences."
      />
      <h1>Talks</h1>
      <p>
        Below is an overview of the talks that I have given at meetups and
        conferences.
      </p>
      <p></p>
      <hr />
      {talks}
    </Layout>
  );
};

export default Talks;
