import {getAllPosts } from "../../lib/blog";
import BlogTeaserHorizontal from "../../components/BlogTeaserHorizontal";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  }
}

export default function Index({ posts }) {
  return (
    <>
      <Head>
        <title>Posts | Alexander Varwijk</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Kingdutch" />
        <meta name="description" content="The thoughts and musings of Alexander Varwijk - Full Stack developer." />
        <meta property="og:title" content="Posts" />
        <meta property="og:description" content="The thoughts and musings of Alexander Varwijk - Full Stack developer." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0067FB" />
        <link rel="canonical" href="https://www.alexandervarwijk.com/blog" />
      </Head>
      <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
        <h1 className="text-3xl font-bold mt-4 mb-2">Posts</h1>
        {posts.map(post => (
          <BlogTeaserHorizontal
            key={post.slug}
            frontmatter={post.frontmatter}
            slug={`/blog/${post.slug}`}
            HeadingLevel="h2"
          />
        ))}
      </main>
    </>
  );
}
