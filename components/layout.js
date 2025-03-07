import React from 'react';
import { useIsResume } from '../lib/hooks/useIsResume';
import Header from './header';

const Layout = ({ children }) => {
  const isResume = useIsResume();
  return (
    <>
      <div className="text-center">
        <a href="#content" className="text-blue-600 sr-only focus:not-sr-only">
          Skip to main content
        </a>
      </div>
      <Header siteTitle={'Alexander Varwijk'} />
      <span id="content" />
      {children}
      <footer className={`mx-auto px-4 py-6 max-w-2xl text-sm text-slate-500 lg:max-w-3xl lg:px-0${isResume ? " print:hidden" : ""}`}>
        <div>
          Copyright © <a href="https://www.alexandervarwijk.com" className='underline'>Alexander Varwijk</a>
          {` • Find me on `}
          <a rel="me" href="https://bsky.app/profile/kingdut.ch" className='underline'>Bluesky</a>
          {`, `}
          <a href="https://www.linkedin.com/in/alexander-varwijk/" className='underline'>LinkedIn</a>
          {`, and `}
          <a href="https://github.com/Kingdutch/" className='underline'>GitHub</a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
