import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2018,
      globals: {},
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
      "quotes": ["error", "double", { allowTemplateLiterals: true }]
    },
    files: ["**/*.js"]
  },
  {
    files: ["**/*.spec.*"],
    languageOptions: {
      env: { mocha: true }
    },
    rules: {}
  }
];
