import { type LoaderFunctionArgs, json, type MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { getAllPosts } from '../lib/blog';
import BlogTeaserHorizontal from '../components/BlogTeaserHorizontal';


export async function loader({
  params,
}: LoaderFunctionArgs) {
  const posts = await getAllPosts();

  return json({ posts });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Posts | Alexander Varwijk" },
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
      href: "https://www.alexandervarwijk.com/blog",
    },
    // Open Graph
    {
      name: "og:title",
      content: "Posts",
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
      content: "Posts",
    },
    {
      name: "twitter:description",
      content: "The thoughts and musings of Alexander Varwijk.",
    },
  ];
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
      <h1 className="text-3xl font-bold mt-4 mb-2">Posts</h1>
      {posts.map((post) => (
        <BlogTeaserHorizontal
          key={post.slug}
          frontmatter={post.frontmatter}
          slug={`/blog/${post.slug}`}
          HeadingLevel="h2"
        />
      ))}
    </main>
  );
}
