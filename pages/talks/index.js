// import React from 'react';
//
// import { useStaticQuery, graphql, Link } from 'gatsby';
// import Layout from '../components/layout';
// import SEO from '../components/seo';

import {getAllTalks} from "../../lib/talks";
import Link from "next/link";

export async function getStaticProps({ params }) {
  const talks = getAllTalks();
  return {
    props: {
      talks,
    },
  }
}

export default function Talks({ talks }) {
  return (
    <>
      {/*<SEO*/}
      {/*  title="Talks"*/}
      {/*  description="An overview of the talks given by Alexander at meetups and conferences."*/}
      {/*/>*/}
      <h1>Talks</h1>
      <p>
        Below is an overview of the talks that I have given at meetups and
        conferences.
      </p>
      <p></p>
      <hr />
      {talks.map(({ slug, frontmatter, content }) => (
        <article key={slug} style={{ marginTop: '1rem' }}>
          <div>
            {frontmatter.date}, {frontmatter.conference}
          </div>
          <h2>
            <Link href={`talks/${slug}`}>{frontmatter.title}</Link>
          </h2>
          <div>{frontmatter.description}</div>
        </article>
      ))}
    </>
  );
};
