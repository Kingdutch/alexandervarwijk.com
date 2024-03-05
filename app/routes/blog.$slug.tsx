import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { getPostBySlug } from '../lib/blog';
import ConvertKitNewsletter from '../components/forms/ConvertKitNewsletter';
import ProseContainer from '../components/ProseContainer';


export async function loader({
  params,
}: LoaderFunctionArgs) {
  const post = getPostBySlug(params.slug);
  const markdown = await remark()
    .use(html)
    .use(prism)
    .process(post.content || '');
  const content = markdown.toString();

console.log(post);

  return json({
    post: {
      ...post,
      content,
    }
  })
}

export const meta: MetaFunction<typeof loader> = ({
  data
}) => {
  return [
    { title: `${data?.post.frontmatter.title} | Alexander Varwijk` },
    {
      name: "description",
      content: data?.post.frontmatter.description,
    },
    {
      name: "theme-color",
      content: "#0067FB",
    },
    {
      rel: "canonical",
      href: `https://www.alexandervarwijk.com/blog/${data?.post.frontmatter.slug}`,
    },
    // Open Graph
    {
      name: "og:title",
      content: `${data?.post.frontmatter.title} | Alexander Varwijk`,
    },
    {
      name: "og:description",
      content: data?.post.frontmatter.description,
    },
    {
      name: "og:image",
      content: `https://www.alexandervarwijk.com${data?.post.frontmatter.featuredImage}`,
    },
    {
      name: "og:type",
      content: "article",
    },
    {
      name: "og:profile:first_name",
      content: "Alexander",
    },
    {
      name: "og:profile:last_name",
      content: "Varwijk",
    },
    {
      name: "og:profile:username",
      content: "Kingdutch",
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
      content: `${data?.post.frontmatter.title} | Alexander Varwijk`,
    },
    {
      name: "twitter:description",
      content: data?.post.frontmatter.description,
    },
  ];
};

export default function Index() {
  const { post } = useLoaderData<typeof loader>();
  
  // TODO: Add og:image:alt
  return (
    <>
      <ProseContainer>
        <h1 className="px-4 lg:px-0 mb-0">{post.frontmatter.title}</h1>
        <time className="px-4 lg:px-0">{post.frontmatter.date}</time>
        <img
          src={post.frontmatter.featuredImage}
          loading="eager"
          width="900"
          height="600"
          alt=""
          // layout="intrinsic"
          // objectFit="cover"
        />
        <div
          className="px-4 lg:px-0"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </ProseContainer>
      <ConvertKitNewsletter />
    </>
  );
}
