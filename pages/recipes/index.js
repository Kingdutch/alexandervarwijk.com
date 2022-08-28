import Head from 'next/head';
import { getAllRecipes } from '../../lib/recipes';
import RecipeTeaserHorizontal from '../../components/RecipeTeaserHorizontal';

export async function getStaticProps({ params }) {
  const recipes = getAllRecipes();
  return {
    props: {
      recipes,
    },
  };
}

export default function Recipes({ recipes }) {
  return (
    <>
      <Head>
        <title>Recipes | Alexander Varwijk</title>
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#0067FB" />
        <link rel="canonical" href="https://www.alexandervarwijk.com/recipes" />
      </Head>
      <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
        <h1 className="text-3xl font-bold mt-4 mb-2">Recipes</h1>
        <p>
          Below is an overview of recipes I've found on the web, made easily
          accessible for myself, so I can cook without ads.
        </p>
        <hr className="mt-4" />
        {recipes.map((recipe) => (
          <RecipeTeaserHorizontal
            key={recipe.slug}
            frontmatter={recipe.frontmatter}
            slug={`/recipes/${recipe.slug}`}
            HeadingLevel="h2"
            className="mt-4"
          />
        ))}
      </main>
    </>
  );
}
