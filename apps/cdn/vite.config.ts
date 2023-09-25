import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const file = fileURLToPath(new URL("package.json", import.meta.url));
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

export default defineConfig({
  plugins: [
    ...VitePluginNode({
      adapter: "fastify",
      appPath: "./app.ts",
    }),
  ],
  server: {
    port: 5175,
  },
  define: {
    PKG: pkg,
  },
  build: {
    minify: "esbuild",
  },
});
