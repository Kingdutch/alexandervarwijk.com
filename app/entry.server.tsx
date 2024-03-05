/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

import { NonceContext } from "./components/nonce-context";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  const cspNonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
                        .map(b => b.toString(16).padStart(2, '0')).join('');

  const body = await renderToReadableStream(
    <NonceContext.Provider value={cspNonce}>
      <RemixServer context={remixContext} url={request.url} />
    </NonceContext.Provider>,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
      nonce: cspNonce
    }
  );

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  responseHeaders.set(
    "Content-Security-Policy",
     "default-src 'self' https://*.convertkit.com https://alexandervarwijk.ck.page; frame-src https://www.slideshare.net https://www.youtube.com; frame-ancestors: 'none'; " +
      process.env.NODE_ENV === 'production'
      ? `script-src 'self' 'nonce-${cspNonce}' https://*.convertkit.com https://alexandervarwijk.ck.page`
      : `style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'unsafe-eval' 'self' 'nonce-${cspNonce}' https://*.convertkit.com https://alexandervarwijk.ck.page`,
  );
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
