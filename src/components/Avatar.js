/**
 * @file
 * Renders a list of recent blogposts.
 *
 */

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

function Avatar({ style }) {
  const { file } = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "alexandervarwijk.jpeg" }) {
          childImageSharp {
            fixed(width: 75, height: 75) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  );

  return (
    <Img
      fixed={file.childImageSharp.fixed}
      alt={'A headshot of Alexander Varwijk'}
      style={{
        float: 'left',
        borderRadius: '100%',
        ...style,
      }}
    />
  );
}

export default Avatar;
