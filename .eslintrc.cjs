/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multiline-html-element-content-newline": [
      "error",
      {
        ignoreWhenEmpty: true,
        allowEmptyLines: false,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        semi: true,
        singleQuote: false,
        trailingComma: "es5",
        printWidth: 120,
        bracketSpacing: true,
      },
    ],
  },
};
