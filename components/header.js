import React from 'react';
import { useRouter} from "next/router";
import Link from "next/link";
import {AnimatePresence, AnimateSharedLayout, motion, useReducedMotion} from "framer-motion";

const MenuLink = ({href, children, className="", ...rest}) => {
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();
  const isActive = router.pathname === href;
  const linkClasses = `inline-block relative p-1 mx-1 ${shouldReduceMotion && isActive ? 'underline' : ''} ${className} `;
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
      <div className="flex flex-col mx-auto px-4 py-2 items-center max-w-2xl md:py-4 md:flex-row lg:max-w-3xl lg:px-0">
        <Link href="/">
          <a className="text-2xl font-medium">{siteTitle}</a>
        </Link>
        <nav className="my-2 md:my-0 md:ml-auto">
          <MenuLink href="/">Home</MenuLink>
          &middot;
          <MenuLink href="/blog">Posts</MenuLink>
          &middot;
          <MenuLink href="/talks">Talks</MenuLink>
          &middot;
          <MenuLink href="/resources">Resources</MenuLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
