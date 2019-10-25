import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Avatar from "./Avatar";

const Header = ({ siteTitle, isFront }) => {
  const TitleTag = isFront ? "h1" : "div"

  return <header
    style={{
      backgroundColor: `#0067FB`,
      background: `linear-gradient(140deg, rgb(0, 103, 251) 59%, rgb(255, 155, 61) 61%)`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1rem 1.0875rem`,
        display: `flex`,
        alignItems: `center`,
      }}
    >
      <Avatar style={{ marginRight: '1rem' }} />
      <TitleTag style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
        fontWeight: "bold",
        fontSize: "2.25rem",
        lineHeight: 1.1,
        margin: 0
      }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </TitleTag>
      <div style={{ marginLeft: "auto"}}>
        <Link style={{ color: "#001430", textDecoration: "none" }} to="/blog">Blog</Link> &middot; <Link style={{ color: "#001430", textDecoration: "none" }} to="/resources">Resources</Link>
      </div>
    </div>
  </header>
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
