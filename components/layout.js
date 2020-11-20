/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import Header from './header';

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <a href={'#content'}>Skip to main content</a>
      </div>
      <Header siteTitle={"Alexander Varwijk"} />
      <div id="content" as={'main'}>
        {children}
      </div>
      <footer>
        <div>
          © Alexander Varwijk, proudly built with
          {` `}
          <a href="https://nextjs.org">Next.js</a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
