import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginCssModules from "eslint-plugin-css-modules";
import pluginJest from "eslint-plugin-jest";
import pluginComplexity from "eslint-plugin-complexity";
import pluginPlaywright from "eslint-plugin-playwright";
import pluginImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/coverage/**",
            "**/*.config.js",
            "**/*.config.mjs",
            "**/.eslintrc",
            "**/.storybook/**",
            "**/jest.*.config.ts",
            "child-apps/*/postcss.js",
            "env.development.js",
        ],
    },
    js.configs.recommended,
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: [
                    "child-apps/*/tsconfig.json",
                    "tsconfig.json",
                ],
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
            react: pluginReact,
            "react-hooks": pluginReactHooks,
            "css-modules": pluginCssModules,
            jest: pluginJest,
            complexity: pluginComplexity,
            playwright: pluginPlaywright,
            import: pluginImport,
        },
        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                typescript: {
                    project: ["child-apps/*/tsconfig.json", "tsconfig.json"],
                },
            },
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-implied-eval": "error",
            // Раскоментируй проверки для CSS modules
            //"css-modules/no-unused-class": "off",
            "react/jsx-no-target-blank": "off",
            // Раскоментируй проверки для Complexity
            //complexity: ["error", 10],
        },
    },
    {
        files: ["**/*.js", "**/*.cjs"],
        languageOptions: {
            globals: {
                ...globals.node,
                module: "readonly",
                require: "readonly",
            },
        },
        rules: {
            "no-undef": "off",
        },
    },
    // Jest test files configuration
    {
        files: [
            "**/*.test.ts",
            "**/*.test.tsx",
            "**/*.spec.ts",
            "**/*.spec.tsx",
            "**/__tests__/**/*",
            "**/__mocks__/**/*",
        ],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        plugins: {
            jest: pluginJest,
        },
        // Раскоментируй проверки для jest
        rules: {
            //...pluginJest.configs.recommended.rules,
        },
    },
    // Playwright
    {
        files: ["**/*.e2e.ts", "**/*.e2e.tsx", "**/e2e/**/*"],
        plugins: {
            playwright: pluginPlaywright,
        },
        rules: {
            ...pluginPlaywright.configs["flat/recommended"].rules,
        },
    },
    eslintConfigPrettier,
];
