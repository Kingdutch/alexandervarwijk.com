import remark from "remark";
import html from "remark-html";
import prism from 'remark-prism';
import Head from "next/head";
import Image from "next/image";
import {getAllPosts, getPostBySlug} from "../../lib/blog";
import ConvertKitNewsletter from "../../components/forms/ConvertKitNewsletter";
import ProseContainer from "../../components/ProseContainer";

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const markdown = await remark()
    .use(html)
    .use(prism)
    .process(post.content || '');
  const content = markdown.toString();

  return {
    props: {
      ...post,
      content
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default function Index({ slug, frontmatter, content }) {
  // TODO: Add og:image:alt
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
        <meta property="og:image" content={`https://www.alexandervarwijk.com${frontmatter.featuredImage}`} />
        <meta property="og:author:profile:first_name" content="Alexander" />
        <meta property="og:author:profile:last_name" content="Varwijk" />
        <meta property="og:author:profile:username" content="Kingdutch" />
        <meta name="theme-color" content="#0067FB" />
        <link rel="canonical" href={`https://www.alexandervarwijk.com/blog/${slug}`} />
      </Head>
      <ProseContainer>
        <h1 className="px-4 lg:px-0 mb-0">{frontmatter.title}</h1>
        <time className="px-4 lg:px-0">{frontmatter.date}</time>
        <Image
          src={frontmatter.featuredImage}
          priority={true}
          loading="eager"
          width="900"
          height="600"
          // layout="intrinsic"
          // objectFit="cover"
        />
        <div
          className="px-4 lg:px-0"
          dangerouslySetInnerHTML={{__html: content}}
        />

      </ProseContainer>
      <ConvertKitNewsletter />
    </>
  );
}
