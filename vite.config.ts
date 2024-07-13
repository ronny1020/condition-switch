import { resolve } from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, pkg.source),
      fileName: "index",
      name: pkg.name,
    },
    minify: false,
    sourcemap: true,
  },
});
