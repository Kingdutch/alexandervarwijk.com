import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <div>
      <div className="text-center">
        <a href="#content" className="text-blue-600 sr-only focus:not-sr-only">
          Skip to main content
        </a>
      </div>
      <Header siteTitle={'Alexander Varwijk'} />
      <span id="content" />
      {children}
      <footer className="mx-auto px-4 py-6 max-w-2xl text-sm text-slate-500 lg:max-w-3xl lg:px-0">
        <div>
          Copyright © Alexander Varwijk. Made with
          {` `}
          <a href="https://nextjs.org" className='underline'>Next.js</a> by <a href="https://www.alexandervarwijk.com" className='underline'>Alexander Varwijk</a>
          {` • `}
          <a href="https://github.com/Kingdutch/" className='underline'>GitHub</a>
          {` • `}
          <a rel="me" href="https://hachyderm.io/@Kingdutch">Mastodon</a>
          {` • `}
          <a href="https://twitter.com/Kingdutch" className='underline'>Twitter</a>
          {` • `}
          <a href="https://www.twitch.tv/TheKingdutch" className='underline'>Twitch</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
