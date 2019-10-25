import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import RecentBlogPosts from '../components/RecentBlogPosts';

const IndexPage = () => (
  <Layout isFront={true}>
    <SEO title="Home" />
    <aside>
      <p>
        I'm a Full Stack developer that learned to program using Perl over 15
        years ago. Since then I've explored many languages but found my focus in
        the world of Webdevelopment.
      </p>
      <p>
        I'm currently working at{' '}
        <a
          href={'https://www.getopensocial.com'}
          title={'Open Social - Online community software'}
        >
          Open social
        </a>
        . As part of my work I've created reusable extensions for Enterprise
        customers and I've been responsible for introducing React into the Open
        Social codebase. I love looking for ways to improve accessibility,
        performance and maintainabiltity of the code I work with, preferring to
        build reusable lasting solutions over hacks. I'm also the maintainer of
        the{' '}
        <a
          href={'https://www.drupal.org/project/yoast_seo/'}
          title={'Real Time SEO Module on Drupal.org'}
        >
          Real Time SEO Drupal module
        </a>{' '}
        (used on 16.000+ sites).
      </p>
      <p>
        You can view more of my work history on{' '}
        <a
          href={'https://www.linkedin.com/in/alexander-varwijk/'}
          title={"Alexander Varwijk's LinkedIn Profile"}
        >
          LinkedIn
        </a>
        . My code is mostly hosted on{' '}
        <a
          href={'https://github.com/Kingdutch'}
          title={"Alexander Varwijk's GitHub Profile"}
        >
          GitHub
        </a>
        . Random thoughts and blurts can be found on{' '}
        <a
          href={'https://twitter.com/Kingdutch/'}
          title={'Alexander Varwijk on Twitter'}
        >
          Twitter
        </a>
        .
      </p>
    </aside>
    <main>
      <h2>Recent Posts</h2>
      <RecentBlogPosts />
    </main>
  </Layout>
);

export default IndexPage;
