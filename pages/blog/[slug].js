import remark from "remark";
import html from "remark-html";
import Image from "next/image";
import {getAllPosts, getPostBySlug} from "../../lib/blog";
import ConvertKitNewsletter from "../../components/forms/ConvertKitNewsletter";
import ProseContainer from "../../components/ProseContainer";

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
      <ProseContainer>
        <h1 className="px-4 lg:px-0 mb-0">{frontmatter.title}</h1>
        <time className="px-4 lg:px-0">{frontmatter.date}</time>
        <Image
          src={frontmatter.featuredImage}
          priority={true}
          loading="eager"
          width="1200"
          height="800"
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
