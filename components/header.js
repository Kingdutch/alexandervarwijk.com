import React from 'react';
import { useRouter} from "next/router";
import Link from "next/link";
import {AnimatePresence, AnimateSharedLayout, motion, useReducedMotion} from "framer-motion";

const MenuLink = ({href, children, className="", ...rest}) => {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const isActive = router.pathname === href;
  const linkClasses = `${className} inline-block relative ${shouldReduceMotion && isActive ? 'underline' : ''}`;
  return (
      <Link href={href}>
        <a
          className={linkClasses}
          {...rest}
        >
          {
            isActive && !shouldReduceMotion
              ? <motion.div
                  layoutId="underline"
                  className="animated-underline"
                  aria-hidden={true}
                />
              : null
          }
          {children}
        </a>
      </Link>
  );
};

const Header = ({ siteTitle }) => {
  return (
    <div className="text-white bg-blue-600">
      <div className="flex mx-auto px-4 py-4 items-center max-w-2xl lg:max-w-3xl lg:px-0">
        <Link href="/">
          <a className="text-2xl font-medium">{siteTitle}</a>
        </Link>
        <nav className="ml-auto">
          <MenuLink href="/">Home</MenuLink>
          <span aria-hidden={true}> &middot; </span>
          <MenuLink href="/blog">Posts</MenuLink>
          <span aria-hidden={true}> &middot; </span>
          <MenuLink href="/talks">Talks</MenuLink>
          <span aria-hidden={true}> &middot; </span>
          <MenuLink href="/resources">Resources</MenuLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
