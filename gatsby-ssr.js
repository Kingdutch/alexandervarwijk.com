import React from 'react';

function onRenderBody({ setPostBodyComponents }) {
  setPostBodyComponents([
    <script key="main" async src={"//visit.alexandervarwijk.com/hello.js"}></script>,
    <noscript><img src={"//visit.alexandervarwijk.com/image.gif"} alt={""} /></noscript>,
  ])
}

export {
  onRenderBody,
}
