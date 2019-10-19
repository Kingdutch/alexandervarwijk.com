/**
 * @file
 * Renders a list of recent blogposts.
 *
 */

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

function Avatar( ) {
  const { file }  = useStaticQuery(
    graphql`
      query {
        file(relativePath:{eq:"alexandervarwijk.jpeg"}) {
          childImageSharp {
              fixed(width: 125, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
        }
      }
    `
  );

  return <Img
    fixed={file.childImageSharp.fixed}
    alt={"A headshot of Alexander Varwijk"}
    style={{
      float: "left",
      margin: "0 2rem 1rem 0",
      // borderRadius: "50%",
    }}
  />
}

export default Avatar;
