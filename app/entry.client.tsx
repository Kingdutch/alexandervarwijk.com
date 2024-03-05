/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { NonceContext } from "./components/nonce-context";

startTransition(() => {
  const scriptElement : HTMLScriptElement|null = document.querySelector("script[nonce]");
  const nonce = scriptElement?.nonce;

  hydrateRoot(
    document,
    <StrictMode>
      <NonceContext.Provider value={nonce}>
          <RemixBrowser />
      </NonceContext.Provider>
    </StrictMode>
  );
});
