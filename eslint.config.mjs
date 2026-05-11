import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginCssModules from "eslint-plugin-css-modules";
import pluginJest from "eslint-plugin-jest";
import pluginComplexity from "eslint-plugin-complexity";
import pluginPlaywright from "eslint-plugin-playwright";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/coverage/**",
            "**/*.config.js",
            "**/*.config.mjs",
            "**/.eslintrc",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: [
                    "child-apps/*/tsconfig.json",
                    "tsconfig.json",
                ],
            },
        },
        plugins: {
            react: pluginReact,
            "react-hooks": pluginReactHooks,
            "css-modules": pluginCssModules,
            jest: pluginJest,
            complexity: pluginComplexity,
            playwright: pluginPlaywright,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-implied-eval": "error",
            "css-modules/no-unused-class": "off",
            "react/jsx-no-target-blank": "off",
        },
    },
    {
        files: ["**/*.e2e.ts", "**/*.e2e.tsx", "**/e2e/**/*"],
        ...pluginPlaywright.configs["flat/recommended"],
    }
);
