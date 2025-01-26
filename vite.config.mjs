import { defineConfig } from "vite";
import pug from "vite-plugin-pug-transformer";

export default defineConfig({
  plugins: [pug({})],
});
