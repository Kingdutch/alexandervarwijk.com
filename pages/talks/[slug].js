import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import Head from 'next/head';
import ConvertKitNewsletter from '../../components/forms/ConvertKitNewsletter';
import { getAllTalks, getTalkBySlug } from '../../lib/talks';
import ProseContainer from '../../components/ProseContainer';
import PdfViewer from "../../components/PdfViewer";

export async function getStaticProps({ params }) {
  const talk = getTalkBySlug(params.slug);
  const markdown = await remark()
    .use(html)
    .use(prism)
    .process(talk.content || '');
  const content = markdown.toString();

  return {
    props: {
      ...talk,
      content,
    },
  };
}

export async function getStaticPaths() {
  const talks = getAllTalks();

  return {
    paths: talks.map((talk) => {
      return {
        params: {
          slug: talk.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default function Index({ slug, frontmatter, content }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Kingdutch" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta
          property="og:image"
          content={`https://www.alexandervarwijk.com${frontmatter.featuredImage}`}
        />
        <meta property="og:author:profile:first_name" content="Alexander" />
        <meta property="og:author:profile:last_name" content="Varwijk" />
        <meta property="og:author:profile:username" content="Kingdutch" />
        <meta name="theme-color" content="#0067FB" />
        <link
          rel="canonical"
          href={`https://www.alexandervarwijk.com/talks/${slug}`}
        />
      </Head>
      <ProseContainer>
        <h1>{frontmatter.title}</h1>
        <div>
          <time>{frontmatter.date}</time>, <span>{frontmatter.conference}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {frontmatter.slides && frontmatter.slides.length ? (
          <section>
            <h2>Slides</h2>
            <PdfViewer file={frontmatter.slides} />
          </section>
        ) : null}
        {frontmatter.recording && frontmatter.recording.length ? (
          <section>
            <h2>Recording</h2>
            <div dangerouslySetInnerHTML={{ __html: frontmatter.recording }} />
          </section>
        ) : null}
      </ProseContainer>
      <ConvertKitNewsletter className="mt-8" />
    </>
  );
}
