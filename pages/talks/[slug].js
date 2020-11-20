import remark from "remark";
import html from "remark-html";
import ConvertKitNewsletter from "../../components/forms/ConvertKitNewsletter";
import React from "react";
import {getAllTalks, getTalkBySlug} from "../../lib/talks";

export async function getStaticProps({ params }) {
  const talk = getTalkBySlug(params.slug);
  const markdown = await remark()
    .use(html)
    .process(talk.content || '');
  const content = markdown.toString();

  return {
    props: {
      ...talk,
      content
    }
  };
}

export async function getStaticPaths() {
  const talks = getAllTalks()

  return {
    paths: talks.map((talk) => {
      return {
        params: {
          slug: talk.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default function Index({ frontmatter, content }) {
  return (
    <>
      <article>
        <h1>{frontmatter.title}</h1>
        <div>
          <time>{frontmatter.date}</time>,{' '}
          <span>{frontmatter.conference}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {frontmatter.slides && frontmatter.slides.length ? (
          <section>
            <h2>Slides</h2>
            <div
              dangerouslySetInnerHTML={{ __html: frontmatter.slides }}
            />
          </section>
        ) : null}
        {frontmatter.recording && frontmatter.recording.length ? (
          <section>
            <h2>Recording</h2>
            <div
              dangerouslySetInnerHTML={{ __html: frontmatter.recording }}
            />
          </section>
        ) : null}
      </article>
      <ConvertKitNewsletter />
    </>
  );
}
