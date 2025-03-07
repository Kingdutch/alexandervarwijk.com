import Image from 'next/image';
import Link from 'next/link';
import ClickableArea from './ClickableArea';

export default function BlogTeaserVertical({
  slug,
  frontmatter,
  HeadingLevel,
  ...rest
}) {
  return (
    <ClickableArea {...rest}>
      <Image
        src={frontmatter.featuredImage}
        alt=""
        width={300}
        height={200}
        objectFit="cover"
      />
      <div>
        <time>{frontmatter.date}</time>
        <HeadingLevel className="text-xl mt-3 mb-2 text-blue-600">
          <Link href={slug}>
            <a data-expand-click-area={true} className="underline font-medium">
              {frontmatter.title}
            </a>
          </Link>
        </HeadingLevel>
        <div
          className="prose lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: frontmatter.description }}
        />
      </div>
    </ClickableArea>
  );
}
