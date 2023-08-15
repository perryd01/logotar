// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcssConfig = require("config/postcss.config.cjs");

const config = {
  ...postcssConfig,
};

module.exports = config;
