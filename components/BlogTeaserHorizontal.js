import Image from 'next/image';
import Link from 'next/link';
import ClickableArea from './ClickableArea';

export default function BlogTeaserHorizontal({
  slug,
  frontmatter,
  HeadingLevel,
  className = 'mb-8 md:flex md:flex-row',
  ...rest
}) {
  return (
    <ClickableArea className={className} {...rest}>
      <Image
        src={frontmatter.featuredImage}
        alt=""
        width={300}
        height={200}
        objectFit="contain"
        objectPosition="top"
      />
      <div className="md:ml-4">
        <time>{frontmatter.date}</time>
        <HeadingLevel className="text-xl mt-3 mb-2 text-blue-600 dark:text-yellow-600">
          <Link href={slug}>
            <a data-expand-click-area={true} className="underline font-medium">
              {frontmatter.title}
            </a>
          </Link>
        </HeadingLevel>
        <div
          className="prose lg:prose-lg dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: frontmatter.description }}
        />
      </div>
    </ClickableArea>
  );
}
