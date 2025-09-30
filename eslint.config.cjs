const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([ {
    languageOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {
            project: './tsconfig.json',
            tsconfigRootDir: __dirname,
        },

        globals: {
            ...globals.node,
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),

    rules: {
        "@typescript-eslint/explicit-function-return-type": "error",

        "@typescript-eslint/no-misused-promises": [ "error", {
            checksVoidReturn: false,
        } ],

        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-explicit-any": "warn",

        "@typescript-eslint/no-unused-vars": [ "warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        } ],

        "no-console": [ "warn", {
            allow: [ "warn", "error" ],
        } ],

        "prefer-const": "error",
    },
},
globalIgnores([
    "**/dist",
    "**/node_modules",
    "**/prisma",
    "./eslint.config.cjs",
]) ]);