// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const eslintTanStackPlugin = require("@tanstack/eslint-plugin-query");

module.exports = defineConfig([
  expoConfig,
  ...eslintTanStackPlugin.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*", ".expo", "node_modules/*"],
  },
]);
