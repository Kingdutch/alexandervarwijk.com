/**
 * @file
 * Renders a list of recent blogposts.
 *
 */

import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const StyledImg = styled(Img)`
  border-radius: 100%;
  width: 60px;
  height: 60px;
  flex: auto 0 0;

  @media (min-width: 560px) {
    width: 75px;
    height: 75px;
  }
`;

function Avatar({ style }) {
  const { file } = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "alexandervarwijk.jpeg" }) {
          childImageSharp {
            fluid(maxWidth: 75, maxHeight: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );

  return (
    <StyledImg
      fluid={file.childImageSharp.fluid}
      alt={'A headshot of Alexander Varwijk'}
      style={style}
    />
  );
}

export default Avatar;
