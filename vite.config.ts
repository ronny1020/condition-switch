import { resolve } from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";
import dts from "vite-plugin-dts";

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
  plugins: [dts({ rollupTypes: true })],
});
