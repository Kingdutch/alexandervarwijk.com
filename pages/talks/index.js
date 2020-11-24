// import React from 'react';
//
// import { useStaticQuery, graphql, Link } from 'gatsby';
// import Layout from '../components/layout';
// import SEO from '../components/seo';

import {getAllTalks} from "../../lib/talks";
import Link from "next/link";
import TalkTeaserVertical from "../../components/TalkTeaserVertical";

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
    <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
      {/*<SEO*/}
      {/*  title="Talks"*/}
      {/*  description="An overview of the talks given by Alexander at meetups and conferences."*/}
      {/*/>*/}
      <h1 className="text-3xl font-bold mt-4 mb-2">Talks</h1>
      <p>
        Below is an overview of the talks that I have given at meetups and
        conferences.
      </p>
      <hr className="mt-4" />
      {talks.map(talk => (
        <TalkTeaserVertical
          key={talk.slug}
          frontmatter={talk.frontmatter}
          slug={`/talks/${talk.slug}`}
          HeadingLevel="h2"
          className="mt-4"
        />
      ))}
    </main>
  );
};
