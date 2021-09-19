import BlogTeaserHorizontal from '../components/BlogTeaserHorizontal';
import { getRecentPosts } from '../lib/blog';
import remark from 'remark';
import html from 'remark-html';

export async function getStaticProps({ params }) {
  const post = getRecentPosts(1)[0];
  const markdown = await remark()
    .use(html)
    .process(post.content || '');
  const content = markdown.toString();

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export default function ConfirmSubscription({ post }) {
  return (
    <main>
      <section>
        <h1>Subscription confirmed!</h1>
        <p>
          Boom! You're officially confirmed and on the list. Expect some great
          emails headed your way in the near future. If you haven't done so
          already, be sure to read my newest post.
        </p>
        <BlogTeaserHorizontal
          key={post.slug}
          frontmatter={post.frontmatter}
          slug={`/blog/${post.slug}`}
          HeadingLevel="h2"
        />
      </section>
    </main>
  );
}
