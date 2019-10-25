import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';

const HeaderBackground = styled.header`
  background: #0067fb
    linear-gradient(140deg, rgb(0, 103, 251) 59%, rgb(255, 155, 61) 61%);
  margin-bottom: 1.45rem;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem 1.0875rem;
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  font-size: 2.25rem;
  line-height: 1.1;
  margin: 0;
`;

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Nav = styled.nav`
  margin-left: auto;
`;

const NavLink = styled(Link)`
  color: #001430;
  text-decoration: none;
`;

const Header = ({ siteTitle, isFront }) => {
  const titleProps = isFront ? '' : { as: 'div' };

  return (
    <HeaderBackground>
      <HeaderContainer>
        <Avatar style={{ marginRight: '1rem' }} />
        <PageTitle {...titleProps}>
          <TitleLink to="/">{siteTitle}</TitleLink>
        </PageTitle>
        <Nav>
          <NavLink to="/blog">Blog</NavLink> &middot;{' '}
          <NavLink to="/resources">Resources</NavLink>
        </Nav>
      </HeaderContainer>
    </HeaderBackground>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
