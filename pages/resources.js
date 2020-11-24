import React from 'react';
import {getAllResources} from "../lib/resources";
import remark from "remark";
import html from "remark-html";
import ProseContainer from "../components/ProseContainer";
import Head from "next/head";
import {meta} from "./index";

export async function getStaticProps({ params }) {
  const resources = await Promise.all(
    getAllResources()
      .map(async resource => {
        const markdown = await remark()
          .use(html)
          .process(resource.content || '');
        return {
          ...resource,
          content: markdown.toString()
        };
      })
  );

  return {
    props: {
      resources,
    },
  }
}

export default function Resources({ resources }) {
  return (
    <>
      <Head>
        <title>Resources | Alexander Varwijk</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Kingdutch" />
        <meta name="description" content="Useful resources curated by Alexander Varwijk." />
        <meta property="og:title" content="Resources" />
        <meta property="og:description" content="Useful resources curated by Alexander Varwijk." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0067FB" />
        <link rel="canonical" href="https://www.alexandervarwijk.com/resources" />
      </Head>
      <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
        <h1 className="text-3xl font-bold mt-4 mb-2">Resources</h1>
        <p>Below is a selection of my bookmarks for quick reference.</p>
        <hr className="mt-4" />
        {resources.map(({slug, frontmatter, content}) => (
          <div key={slug} style={{ marginTop: '1rem' }}>
            <div className="mt-3">{frontmatter.tags.join(', ')}</div>
            <h2 className="text-xl mb-2 text-blue-600">
              <a
                className="underline font-medium"
                href={frontmatter.url}>{frontmatter.title}</a>
            </h2>
            <div
              className="prose lg:prose-lg"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ))}
      </main>
    </>
  );
};
