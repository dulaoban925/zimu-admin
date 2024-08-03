import vue from "eslint-plugin-vue";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/node_modules/",
        "**/package.json",
        "**/package-lock.json",
        "**/.vscode/",
        "**/.husky/",
        "**/public/",
        "**/tsconfig.json",
        "**/tsconfig.node.json",
    ],
    files: [
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.jsx',
      'src/**/*.tsx',
      'src/**/*.vue',
      'src/**/*.json',
      'src/**/*.md',
    ]
}, ...compat.extends(
    "standard",
    "plugin:prettier/recommended",
    "./.eslintrc-auto-import.json",
), {
    plugins: {
        vue,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            NodeJS: true,
            ZiMuAuth: true,
            ZiMuRoute: true,
        },

        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            parser: "@typescript-eslint/parser",
        },
    },

    rules: {
        "vue/multi-word-component-names": 0,
        "vue/no-v-model-argument": 0,
        "vue/no-multiple-template-root": 0,
        "no-void": 0,
        "no-redeclare": 0,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],

        "import/order": ["error", {
            groups: [
                "builtin",
                "external",
                "internal",
                "parent",
                "sibling",
                "index",
                "object",
                "type",
            ],

            pathGroups: [{
                pattern: "vue",
                group: "external",
                position: "before",
            }, {
                pattern: "@vue/**",
                group: "external",
                position: "before",
            }, {
                pattern: "@element-plus/**",
                group: "internal",
            }],

            pathGroupsExcludedImportTypes: ["type"],
        }],
    },
}];