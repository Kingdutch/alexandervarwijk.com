export default function ProseContainer({ children }) {
  return (
    <article className="mx-auto prose prose-blue lg:px-0 lg:prose-xl">
      {children}
    </article>
  );
}