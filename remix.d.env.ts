/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />
/// <reference types="@vite/client" />

// declare module "*.mdx" {
//   let MDXComponent: (props: any) => JSX.Element;
//   export const frontmatter: any;
//   export default MDXComponent;
// }

declare module "__STATIC_CONTENT_MANIFEST" {
  const manifest: string;
  export default manifest;
}
