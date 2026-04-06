// @ts-check
const { defineConfig } = require("eslint/config");
const rootConfig = require("../eslint.config.js");

/** Re-exports root config; `ng lint` resolves patterns from `src/`. */
module.exports = defineConfig([...rootConfig]);
