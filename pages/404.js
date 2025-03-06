import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404: Not found</title>
      </Head>
      <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
        <h1 className="text-3xl font-bold mt-1 mt-4 mb-2">Page not Found</h1>
        <p>
          You just hit a route that doesn&#39;t exist.. oops.
        </p>
        <p>
          If you think somethig should be here, <a href={"https://bsky.app/profile/kingdut.ch"} className="text-blue-600 dark:text-yellow-600">let me know on Bluesky</a>.
        </p>
      </main>
    </>
  )
}
