import type { ReactNode } from "react";

export default function ProseContainer({ children } : { children: ReactNode }) {
  return (
    <article className="mx-auto prose prose-blue lg:px-0 lg:prose-xl dark:text-gray-200">
      {children}
    </article>
  );
}
