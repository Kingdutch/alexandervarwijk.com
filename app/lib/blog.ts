import matter from 'gray-matter';
import { parseJSON, format } from 'date-fns';
import fs from 'fs';
import { join } from 'path';

const postsDirectory = join(process.cwd(), 'content', 'blog');

/**
 * Gets the information for a post based on a slug.
 *
 * @param slug
 *   A slug from a file path including the extension or from a URL without the
 *   extension.
 * @return {{frontmatter: {[p: string]: any, date: string}, slug: string, content: string}}
 */
export function getPostBySlug(slug : string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const date = format(parseJSON(data.date), 'MMMM do, yyyy');

  return { slug: realSlug, frontmatter: { ...data, date }, content };
}

export function getRecentPosts(limit = 6) {
  return Promise.resolve(
    fs
      .readdirSync(postsDirectory)
      .reverse()
      .slice(0, limit)
      .map((slug) => getPostBySlug(slug))
  );
}

export function getAllPosts() {
  return Promise.resolve(
    fs
      .readdirSync(postsDirectory)
      .reverse()
      .map((slug) => getPostBySlug(slug))
  );
}
