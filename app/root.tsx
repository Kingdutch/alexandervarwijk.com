import { useContext } from "react";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { NonceContext } from "./components/nonce-context";
import Header from './components/header';
import { useIsResume } from "./lib/hooks/useIsResume";

import '../styles/global.css';
import '../styles/prism-darcula.css';

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useContext(NonceContext);
  const isResume = useIsResume();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-black dark:text-gray-300">
        <div className="text-center">
          <a href="#content" className="text-blue-600 sr-only focus:not-sr-only">
            Skip to main content
          </a>
        </div>
        <Header siteTitle={'Alexander Varwijk'} />
        <span id="content" />
        {children}
        <footer className={`mx-auto px-4 py-6 max-w-2xl text-sm text-center text-slate-500 lg:max-w-3xl lg:px-0${isResume ? " print:hidden" : ""}`}>
          <p>
            Copyright © Alexander Varwijk.
          </p>
          <p>
            Made with
            {` `}
            <a href="https://remix.run" className='underline'>Remix</a>
            {` `}
            hosted on <a href="https://pages.cloudflare.com/" className='underline'>Cloudflare Pages</a>
          </p>
          <p style={{marginTop: '1rem'}}>
            Find me on<br />
            <a href="https://github.com/Kingdutch/" className='underline'>GitHub</a>
            {` • `}
            <a rel="me" href="https://hachyderm.io/@Kingdutch" className='underline'>Mastodon</a>
            {` • `}
            <a href="https://twitter.com/Kingdutch" className='underline'>Twitter</a>
            {` • `}
            <a href="https://www.twitch.tv/TheKingdutch" className='underline'>Twitch</a>
          </p>
        </footer>

        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
