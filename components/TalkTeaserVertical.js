import Link from "next/link";
import ClickableArea from "./ClickableArea";

export default function TalkTeaserVertical({ slug, frontmatter, HeadingLevel, ...rest }) {
  return (
    <ClickableArea {...rest}>
      <HeadingLevel className="text-xl mt-3 mb-2 text-blue-600">
        <Link href={slug}>
          <a
            data-expand-click-area={true}
            className="underline font-medium"
          >
            {frontmatter.title}
          </a>
        </Link>
      </HeadingLevel>
      <div className="prose lg:prose-lg">
        <time>{frontmatter.date}</time>, { frontmatter.conference }
      </div>
      <div dangerouslySetInnerHTML={{ __html: frontmatter.description }} />
    </ClickableArea>
  );
}