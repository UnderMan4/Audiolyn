import js from "@eslint/js";
import markdown from "@eslint/markdown";
import prettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
   {
      files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],

      plugins: {
         js,
         tseslint,
         react: pluginReact,
         "react-hooks": reactHooks,
         "eslint-plugin-prettier": prettier,
      },
      extends: ["js/recommended", "tseslint/recommended"],
      languageOptions: {
         parserOptions: {
            ecmaFeatures: {
               jsx: true,
            },
         },
         globals: {
            ...globals.browser,
            ...globals.worker,
            ...globals.serviceworker,
         },
      },
      rules: {
         "react-hooks/exhaustive-deps": "warn",
         "@typescript-eslint/no-namespace": "off",
         "eslint-plugin-prettier/prettier": ["error", { endOfLine: "auto" }],
         "no-multiple-empty-lines": "off",
      },
   },
   {
      files: ["**/*.md"],
      plugins: { markdown },
      language: "markdown/gfm",
      extends: ["markdown/recommended"],
   },
   {
      ignores: [
         "**/node_modules/**",
         "**/dist/**",
         "**/build/**",
         "env.d.ts",
         "vite.config.ts",
         "vite.config.js",
         ".react-router/*",
         "src-tauri/*",
      ],
   },
]);
