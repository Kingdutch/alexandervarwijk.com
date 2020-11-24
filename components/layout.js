import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="text-center">
        <a href="#content" className="text-blue-600 sr-only focus:not-sr-only">Skip to main content</a>
      </div>
      <Header siteTitle={"Alexander Varwijk"} />
      <span id="content" />
      {children}
      <footer className="mx-auto px-4 py-6 max-w-2xl lg:max-w-3xl lg:px-0">
        <div>
          © Alexander Varwijk, proudly built with
          {` `}
          <a href="https://nextjs.org">Next.js</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
