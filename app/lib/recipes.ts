import matter from 'gray-matter';
import { parseJSON, format } from 'date-fns';
import fs from 'fs';
import { join } from 'path';

const recipesDirectory = join(process.cwd(), 'content', 'recipes');

/**
 * Gets the information for a recipe based on a slug.
 *
 * @param slug
 *   A slug from a file path including the extension or from a URL without the
 *   extension.
 * @return {{frontmatter: {[p: string]: any, date: string}, slug: string, content: string}}
 */
export function getRecipeBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(recipesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, frontmatter: data, content };
}

export function getAllRecipes() {
  return fs
    .readdirSync(recipesDirectory)
    .map((slug) => getRecipeBySlug(slug));
}
