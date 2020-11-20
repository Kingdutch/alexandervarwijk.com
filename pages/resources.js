import React from 'react';
import {getAllResources} from "../lib/resources";
import remark from "remark";
import html from "remark-html";

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
      {/*<SEO title="Resources" />*/}
      <h1>Resources</h1>
      <p>Below is a selection of my bookmarks for quick reference.</p>
      <p></p>
      <hr/>
      {resources.map(({slug, frontmatter, content}) => (
        <div key={slug} style={{ marginTop: '1rem' }}>
          <div>{frontmatter.tags.join(', ')}</div>
          <h2>
            <a href={frontmatter.url}>{frontmatter.title}</a>
          </h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      ))}
    </>
  );
};
