import mdx from "@mdx-js/rollup";
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    mdx(),
    remixCloudflareDevProxy(),
    remix({
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths()
  ],
});
