import ClickableArea from './ClickableArea';
import type { ElementType } from 'react';
import { NavLink } from '@remix-run/react';

export default function BlogTeaserHorizontal({
  slug,
  frontmatter,
  HeadingLevel,
  className = 'mb-8 md:flex md:flex-row',
  ...rest
} : {
  slug: string,
  frontmatter: any,
  HeadingLevel: ElementType,
  className?: string
}) {
  return (
    <ClickableArea className={className} {...rest}>
      <img
        src={frontmatter.featuredImage}
        alt=""
        width={300}
        height={200}
        // objectFit="contain"
        // objectPosition="top"
      />
      <div className="md:ml-4">
        <time>{frontmatter.date}</time>
        <HeadingLevel className="text-xl mt-3 mb-2 text-blue-600 dark:text-yellow-600">
          <NavLink to={slug} rel="prefetch" data-expand-click-area={true} className="underline font-medium">
              {frontmatter.title}
          </NavLink>
        </HeadingLevel>
        <div
          className="prose lg:prose-lg dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: frontmatter.description }}
        />
      </div>
    </ClickableArea>
  );
}
