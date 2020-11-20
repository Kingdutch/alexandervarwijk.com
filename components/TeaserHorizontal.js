import Image from 'next/image';
import Link from "next/link";

export default function TeaserHorizontal({ slug, frontmatter, HeadingLevel, ...rest }) {
  return (
    <div {...rest}>
      <Image
        src={frontmatter.featuredImage}
        alt=""
        width={300}
        height={200}
        objectFit="contain"
      />
      <div>
        <time>{frontmatter.date}</time>
        <HeadingLevel>
          <Link href={slug}>{frontmatter.title}</Link>
        </HeadingLevel>
        <div dangerouslySetInnerHTML={{ __html: frontmatter.description }} />
      </div>
    </div>
  );
}