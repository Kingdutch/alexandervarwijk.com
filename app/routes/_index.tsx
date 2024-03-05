import { defer, LoaderFunctionArgs, type MetaFunction } from "@remix-run/cloudflare";

import { getRecentPosts } from '../lib/blog';
import { getFragment } from '../lib/fragment';
import ProseContainer from '../components/ProseContainer';
import BlogTeaserHorizontal from '../components/BlogTeaserHorizontal';
import { Await, NavLink, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  const about = await getFragment('about-me');
  const postPromise = getRecentPosts(1).then(posts => posts[0]);

  return defer({
    about,
    post: postPromise,
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Alexander Varwijk" },
    {
      name: "description",
      content: "The thoughts and musings of Alexander Varwijk.",
    },
    {
      name: "theme-color",
      content: "#0067FB",
    },
    {
      rel: "canonical",
      href: "https://www.alexandervarwijk.com/",
    },
    // Open Graph
    {
      name: "og:title",
      content: "Home",
    },
    {
      name: "og:description",
      content: "The thoughts and musings of Alexander Varwijk.",
    },
    {
      name: "og:type",
      content: "website",
    },
    // Twitter
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:creator",
      content: "@Kingdutch",
    },
    {
      name: "twitter:title",
      content: "Home",
    },
    {
      name: "twitter:description",
      content: "The thoughts and musings of Alexander Varwijk.",
    },
  ];
};

export default function Index() {
  const { about, post } = useLoaderData<typeof loader>();
  return (
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
        <Suspense fallback={"..."}>
          <Await resolve={post}>
            {
              (post) => <BlogTeaserHorizontal
                key={post.slug}
                frontmatter={post.frontmatter}
                slug={`/blog/${post.slug}`}
                HeadingLevel="h3"
              />
            }
          </Await>
        </Suspense>
        <div className="text-right">
          <NavLink to="/blog" rel="prefetch" className="text-xl text-blue-600 font-medium dark:text-yellow-600">
              View all posts
          </NavLink>
        </div>
      </section>
    </main>
  );
}
