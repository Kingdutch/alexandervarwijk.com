/**
 * @file
 * Renders a talk.
 *
 */

import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../layout';
import SEO from '../seo';
import ConvertKitNewsletter from "../forms/ConvertKitNewsletter";

const DatePlace = styled.div`
  margin-top: .5rem;
`

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
        <DatePlace>
          <time>{talk.frontmatter.date}</time>,{' '}
          <span>{talk.frontmatter.conference}</span>
        </DatePlace>
        <div dangerouslySetInnerHTML={{ __html: talk.html }} />
        {talk.frontmatter.slides && talk.frontmatter.slides.length ? (
          <section>
            <h2>Slides</h2>
            <div
              dangerouslySetInnerHTML={{ __html: talk.frontmatter.slides }}
            />
          </section>
        ) : null}
        {talk.frontmatter.recording && talk.frontmatter.recording.length ? (
          <section>
            <h2>Recording</h2>
            <div
              dangerouslySetInnerHTML={{ __html: talk.frontmatter.recording }}
            />
          </section>
        ) : null}
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
        conference
        slides
        recording
      }
    }
  }
`;
