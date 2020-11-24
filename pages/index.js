import { getRecentPosts} from "../lib/blog";
import BlogTeaserVertical from "../components/BlogTeaserVertical";
import ProseContainer from "../components/ProseContainer";
import {getFragment} from "../lib/fragment";
import Head from "next/head";

export async function getStaticProps({ params }) {
  return {
    props: {
      posts: getRecentPosts(),
      about: await getFragment('about-me'),
    },
  }
}

export default function Index({ posts, about }) {
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
          <h2 className="text-3xl font-bold mt-1 mt-4 mb-2">Recent Posts</h2>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-4">
            {posts.map(post => (
              <BlogTeaserVertical
                key={post.slug}
                frontmatter={post.frontmatter}
                slug={`/blog/${post.slug}`}
                HeadingLevel="h3"
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mt-1 mt-4 mb-2">About me</h2>
          <ProseContainer>
            <div dangerouslySetInnerHTML={{ __html: about }} />
          </ProseContainer>
        </section>
      </main>
    </>
  );
}
