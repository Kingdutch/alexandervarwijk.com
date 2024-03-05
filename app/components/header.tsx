import {
  NavLink,
  useLocation,
} from "@remix-run/react";

import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import type { ReactNode } from "react";

import { useIsResume } from '../lib/hooks/useIsResume';

const MenuLink = ({ to, children, className = '', ...rest } : { to: string, children: ReactNode, className?: string }) => {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const isActive = location.pathname === to;
  const linkClasses = `inline-block relative p-1 mx-1 ${
    shouldReduceMotion && isActive ? 'underline' : ''
  } ${className} `;
  return (
    <NavLink to={to} className={linkClasses} {...rest}>
        {isActive && !shouldReduceMotion ? (
          <motion.div
            layoutId="underline"
            className="animated-underline"
            aria-hidden={true}
          />
        ) : null}
        {children}
    </NavLink>
  );
};

const Header = ({ siteTitle } : { siteTitle: string }) => {
  const isResume = useIsResume();

  return (
    <div className={`text-white bg-blue-600 dark:bg-gray-900 dark:text-gray-200${isResume ? " print:hidden" : ""}`}>
      <div className="flex flex-col mx-auto px-4 py-2 items-center max-w-2xl md:py-4 md:flex-row lg:max-w-3xl lg:px-0">
        <NavLink to="/" className="text-2xl font-medium">
          {siteTitle}
        </NavLink>
        <nav className="my-2 md:my-0 md:ml-auto">
          <MenuLink to="/">Home</MenuLink>
          &middot;
          <MenuLink to="/blog">Posts</MenuLink>
          &middot;
          <MenuLink to="/talks">Talks</MenuLink>
          &middot;
          <MenuLink to="/resources">Resources</MenuLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
