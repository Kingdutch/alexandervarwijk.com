import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Header = ({ siteTitle }) => {
  return (
    <div>
      <div>
        <Image
          src={"/images/alexandervarwijk.jpeg"}
          style={{ marginRight: '1rem', borderRadius:"100%" }}
          width={75}
          height={75}
        />
        <Link href="/">{siteTitle}</Link>
        <nav>
          <Link href="/blog">Posts</Link> &middot;{' '}
          <Link href="/talks">Talks</Link> &middot;{' '}
          <Link href="/resources">Resources</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
