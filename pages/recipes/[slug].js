import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import Head from 'next/head';
import Link from 'next/link';
import ConvertKitNewsletter from '../../components/forms/ConvertKitNewsletter';
import { getAllRecipes, getRecipeBySlug } from '../../lib/recipes';
import ProseContainer from '../../components/ProseContainer';
import PdfViewer from "../../components/PdfViewer";

export async function getStaticProps({ params }) {
  const recipe = getRecipeBySlug(params.slug);
  const markdown = await remark()
    .use(html)
    .use(prism)
    .process(recipe.content || '');
  const content = markdown.toString();

  return {
    props: {
      ...recipe,
      content,
    },
  };
}

export async function getStaticPaths() {
  const recipes = getAllRecipes();

  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          slug: recipe.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default function Index({ slug, frontmatter, content }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#0067FB" />
        <link
          rel="canonical"
          href={frontmatter.from_url}
        />
      </Head>
      <ProseContainer>
        <p>
          <Link href={"/recipes"}>&lt; Back</Link> | Originally posted at: <a href={frontmatter.from_url}>{frontmatter.from_name}</a>
        </p>
        <h1>{frontmatter.title}</h1>
        <h2>Ingredients</h2>
        <ul>
          {frontmatter.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}
        </ul>
        <h2>Recipe</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {frontmatter.nutrition
          ? <>
          <h2>Nutrition</h2>
          <table>
            <thead>
            <tr>
              {Object.keys(frontmatter.nutrition).map((type, i) => <td key={i}>{type}</td>)}
            </tr>
            </thead>
            <tbody>
            <tr>
              {Object.values(frontmatter.nutrition).map((value, i) => <td key={i}>{value}</td>)}
            </tr>
            </tbody>
          </table>
          </>
          : null
        }
      </ProseContainer>
    </>
  );
}
