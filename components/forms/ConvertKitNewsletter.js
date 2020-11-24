/**
 * @file
 * Renders the ConvertKit Newsletter Sign-Up form.
 */

import React, {useEffect, useRef} from 'react';

// TODO: This method of adding the ConvertKit form has the annoying side-effect
//  of adding the convertkit script multiple times. However, that's easier to
//  get working before Decoupled Days than it is to style an HTML only solution.
function ConvertKitNewsletter({ className }) {
  const wrapper = useRef(null);
  useEffect(() => {
    const script=document.createElement('script')
    script.src="https://alexandervarwijk.ck.page/3291cf134a/index.js"
    script.async=true;
    script.setAttribute('data-uid', '3291cf134a');
    wrapper.current.innerHtml = "";
    wrapper.current.appendChild(script);
  }, []);

  return <div
    className={className}
    ref={wrapper}
    style={{display: 'flex', justifyContent: 'center'}} />;
};

export default ConvertKitNewsletter;
