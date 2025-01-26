/** @type {import('postcss-load-config').Config} */

import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssNested from "postcss-nested";
import postcssPresetEnv from "postcss-preset-env";

const config = {
  plugins: [
    autoprefixer({}),
    cssnano({}),
    postcssNested({}),
    postcssPresetEnv({}),
  ],
};

export default config;
