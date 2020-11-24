import {getAllPosts } from "../../lib/blog";
import BlogTeaserHorizontal from "../../components/BlogTeaserHorizontal";

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
  );
}