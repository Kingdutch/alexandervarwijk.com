import React from 'react';
import {getAllResources} from "../lib/resources";
import remark from "remark";
import html from "remark-html";
import ProseContainer from "../components/ProseContainer";

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
    <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
    {/*<SEO title="Resources" />*/}
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
  );
};
