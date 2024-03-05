import matter from 'gray-matter';
import { parseJSON, format } from 'date-fns';
import fs from 'fs';
import { join } from 'path';

const resourcesDirectory = join(process.cwd(), 'content', 'resources');

/**
 * Gets the information for a resource based on a slug.
 *
 * @param slug
 *   A slug from a file path including the extension or from a URL without the
 *   extension.
 * @return {{frontmatter: {[p: string]: any, date: string}, slug: string, content: string}}
 */
export function getResourceBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(resourcesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const date = format(parseJSON(data.date), 'MMMM dd, yyyy');

  return { slug: realSlug, frontmatter: { ...data, date }, content };
}

export function getAllResources() {
  return fs
    .readdirSync(resourcesDirectory)
    .map((slug) => getResourceBySlug(slug));
}
