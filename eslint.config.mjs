import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs", 
      globals: { 
        ...globals.node, // ✅ Enables global Node.js variables like `process`
      } 
    } 
  },
  { 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-undef": "off" // ✅ Prevents ESLint from flagging `process` as undefined
    }
  }
];
