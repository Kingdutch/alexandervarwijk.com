import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Header = ({ siteTitle }) => {
  return (
    <div className="text-white bg-blue-600">
      <div className="flex mx-auto px-4 py-2 items-center max-w-2xl lg:max-w-3xl lg:px-0">
        <Image
          src={"/images/alexandervarwijk.jpeg"}
          className="rounded-full"
          width={75}
          height={75}
        />
        <Link href="/">
          <a className="ml-4 text-2xl font-medium">{siteTitle}</a>
        </Link>
        <nav className="ml-auto">
          <Link href="/blog">Posts</Link> &middot;{' '}
          <Link href="/talks">Talks</Link> &middot;{' '}
          <Link href="/resources">Resources</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
