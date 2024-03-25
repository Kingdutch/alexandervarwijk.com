/**
 * @file
 * Renders the ConvertKit Newsletter Sign-Up form.
 */

import React, { useEffect, useRef } from 'react';

// TODO: This method of adding the ConvertKit form has the annoying side-effect
//  of adding the convertkit script multiple times. However, that's easier to
//  get working before Decoupled Days than it is to style an HTML only solution.
function ConvertKitNewsletter({ className }) {
  const wrapper = useRef(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://alexandervarwijk.ck.page/3291cf134a/index.js';
    script.async = true;
    script.setAttribute('data-uid', '3291cf134a');
    wrapper.current.innerHtml = '';
    wrapper.current.appendChild(script);

    // Wire up the ConvertKit submit button to Simple Analytics.
    const onReadyStateChange = () => {
      // Loop through all forms but only process the ones not already marked,
      // this ensures multiple forms on a single page work.
      document.querySelectorAll('.formkit-form').forEach(el => {
        if (!el.hasAttribute('data-sa-linked')) {
          el.setAttribute('data-sa-linked', '');
          el.addEventListener('submit', () => {
            if (typeof sa_event === "function") {
              sa_event("convertkit-form-submit", { form_id: el.getAttribute('data-sv-form') });
            }
          });
        }
      })
      script.removeEventListener('load', onReadyStateChange)
    }
    script.addEventListener('load', onReadyStateChange);
  }, []);

  return (
    <div
      className={className}
      ref={wrapper}
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  );
}

export default ConvertKitNewsletter;
