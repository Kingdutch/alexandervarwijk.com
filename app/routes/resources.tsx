import { getAllResources } from '../lib/resources';
import { remark } from 'remark';
import html from 'remark-html';
import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }: LoaderFunctionArgs) {
  const resources = await Promise.all(
    getAllResources().map(async (resource) => {
      const markdown = await remark()
        .use(html)
        .process(resource.content || '');
      return {
        ...resource,
        content: markdown.toString(),
      };
    })
  );

  return json({
    resources,
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Resources | Alexander Varwijk" },
    {
      name: "description",
      content: "Useful resources curated by Alexander Varwijk.",
    },
    {
      name: "theme-color",
      content: "#0067FB",
    },
    {
      rel: "canonical",
      href: "https://www.alexandervarwijk.com/resources",
    },
    // Open Graph
    {
      name: "og:title",
      content: "Resources",
    },
    {
      name: "og:description",
      content: "Useful resources curated by Alexander Varwijk.",
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
      content: "Resources",
    },
    {
      name: "twitter:description",
      content: "Useful resources curated by Alexander Varwijk.",
    },
  ];
};


export default function Resources() {
  const { resources } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
      <h1 className="text-3xl font-bold mt-4 mb-2">Resources</h1>
      <p>Below is a selection of my bookmarks for quick reference.</p>
      <hr className="mt-4 " />
      {resources.map(({ slug, frontmatter, content }) => (
        <div key={slug} style={{ marginTop: '1rem' }}>
          <div className="mt-3">{frontmatter.tags.join(', ')}</div>
          <h2 className="text-xl mb-2 text-blue-600  dark:text-yellow-600">
            <a className="underline font-medium" href={frontmatter.url}>
              {frontmatter.title}
            </a>
          </h2>
          <div
            className="prose lg:prose-lg dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      ))}
    </main>
  );
}
