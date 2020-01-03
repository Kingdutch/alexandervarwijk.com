/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './header';
import './layout.css';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`;

const SkipLink = styled.a`
  &:not(:focus):not(:active) {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap; /* added line */
  }
`;

const CenterText = styled.div`
  text-align: center;
`

const Layout = ({ children, isFront = false }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle />
      <CenterText>
        <SkipLink href={"#content"}>Skip to main content</SkipLink>
      </CenterText>
      <Header isFront={isFront} siteTitle={data.site.siteMetadata.title} />
      <Container id="content" as={'main'}>{children}</Container>
      <footer>
        <Container>
          © Alexander Varwijk, proudly built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Container>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
