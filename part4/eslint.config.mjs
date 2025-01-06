import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], 
    languageOptions: {sourceType: "commonjs"},
    "rules": {
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "indent": ["error", 2],
      "eqeqeq": "error",       
      "no-unused-vars": "warn",
      "no-console": "off"     
    }
  },
  {languageOptions: { globals: globals.browser, ...globals.node }},
  pluginJs.configs.recommended,
];