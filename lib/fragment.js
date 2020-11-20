import fs from 'fs'
import {join} from 'path'
import remark from "remark";
import html from "remark-html";

const fragmentsDirectory = join(process.cwd(), 'content', 'fragments')

/**
 * Gets a fragments based on it's filename without extension.
 *
 * @param slug
 *   The filename without extesion.
 * @return string
 *   The parsed markdown that can be used as HTMl.
 */
export async function getFragment(slug) {
  const fullPath = join(fragmentsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const markdown = await remark()
    .use(html)
    .process(fileContents || '');

  return markdown.toString();
}
