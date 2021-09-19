import Head from 'next/head';
import { getAllTalks } from '../../lib/talks';
import TalkTeaserVertical from '../../components/TalkTeaserVertical';

export async function getStaticProps({ params }) {
  const talks = getAllTalks();
  return {
    props: {
      talks,
    },
  };
}

export default function Talks({ talks }) {
  return (
    <>
      <Head>
        <title>Talks | Alexander Varwijk</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@Kingdutch" />
        <meta
          name="description"
          content="An overview of the talks given by Alexander at meetups and conferences."
        />
        <meta property="og:title" content="Talks" />
        <meta
          property="og:description"
          content="An overview of the talks given by Alexander at meetups and conferences."
        />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0067FB" />
        <link rel="canonical" href="https://www.alexandervarwijk.com/talks" />
      </Head>
      <main className="mx-auto px-4 max-w-2xl lg:max-w-3xl lg:px-0">
        <h1 className="text-3xl font-bold mt-4 mb-2">Talks</h1>
        <p>
          Below is an overview of the talks that I have given at meetups and
          conferences.
        </p>
        <hr className="mt-4" />
        {talks.map((talk) => (
          <TalkTeaserVertical
            key={talk.slug}
            frontmatter={talk.frontmatter}
            slug={`/talks/${talk.slug}`}
            HeadingLevel="h2"
            className="mt-4"
          />
        ))}
      </main>
    </>
  );
}
