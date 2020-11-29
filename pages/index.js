import Head from "next/head";
import { getRecentPosts} from "../lib/blog";
import ProseContainer from "../components/ProseContainer";
import {getFragment} from "../lib/fragment";
import BlogTeaserHorizontal from "../components/BlogTeaserHorizontal";
import Link from "next/link";

export async function getStaticProps({ params }) {
  return {
    props: {
      post: getRecentPosts(1)[0],
      about: await getFragment('about-me'),
    },
  }
}

export default function Index({ post, about }) {
  return (
    <>
      <Head>
        <title>Home | Alexander Varwijk</title>
        <meta name="description" content="The thoughts and musings of Alexander Varwijk - Full Stack developer." />
        <meta property="og:title" content="Home" />
        <meta property="og:description" content="The thoughts and musings of Alexander Varwijk - Full Stack developer." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Kingdutch" />
        <meta name="twitter:title" content="Home" />
        <meta name="twitter:description" content="The thoughts and musings of Alexander Varwijk - Full Stack developer." />
        <meta name="theme-color" content="#0067FB" />
        <link rel="canonical" href="https://www.alexandervarwijk.com/" />
      </Head>
      <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
        <h1 className="sr-only">Alexander Varwijk</h1>

        <section>
          <h2 className="text-3xl font-bold mt-1 mt-4 mb-2">About me</h2>
          <ProseContainer>
            <div dangerouslySetInnerHTML={{ __html: about }} />
          </ProseContainer>
        </section>

        <section>
          <h2 className="text-3xl font-bold mt-1 mt-4 mb-2">Latest Post</h2>
          <BlogTeaserHorizontal
            key={post.slug}
            frontmatter={post.frontmatter}
            slug={`/blog/${post.slug}`}
            HeadingLevel="h3"
          />
          <div className="text-right">
            <Link href="/blog">
              <a className="text-xl text-blue-600 font-medium">
                View all posts
              </a>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
