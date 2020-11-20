import remark from "remark";
import html from "remark-html";
import {getAllPosts, getPostBySlug} from "../../lib/data/blog";
import Image from "next/image";
import ConvertKitNewsletter from "../../lib/components/forms/ConvertKitNewsletter";

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const markdown = await remark()
    .use(html)
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

export default function Index({ frontmatter, content }) {
  return (
    <>
      <h1>{frontmatter.title}</h1>
      <time>{frontmatter.date}</time><br/>
      <Image
        src={frontmatter.featuredImage}
        priority={true}
        loading="eager"
        width="1200"
        height="800"
        // layout="intrinsic"
        // objectFit="cover"
      />
      <div dangerouslySetInnerHTML={{__html: content}} />
      <ConvertKitNewsletter />
    </>
  );
}
