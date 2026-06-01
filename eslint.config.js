import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
    {
        ignores: [
            "**/dist/**",
            "**/.vitepress/cache/**",
            "**/.vitepress/dist/**",
            "**/tests/**",
            "**/node_modules/**",
            "packages/playground",
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...vue.configs["flat/recommended"],
    {
        rules: {
            "no-console": ["warn", {allow: ["warn", "error"]}],
        }
    },

    {
        files: ["**/*.{tsx,ts,mjs,js}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            semi: "off",
            "@/semi": ["error", "never"],
            '@typescript-eslint/no-explicit-any': 'off',
            "@typescript-eslint/ban-ts-ignore": "off",
        },
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            semi: "off",
        },
    },

    //Vue (важно: parser для SFC + TS внутри script)
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                parser: tseslint.parser,
                extraFileExtensions: [".vue"],
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            semi: "off",
            "@/semi": ["error", "never"],
            "no-undef": "off",
            "vue/multi-word-component-names": "error",
            "vue/html-indent": ["error", 4],
            "vue/require-default-prop": "off",
            "vue/one-component-per-file": "off",
            "vue/script-indent": ["error", 4, {
                baseIndent: 1
            }],
            '@typescript-eslint/no-explicit-any': 'off',
            "@typescript-eslint/ban-ts-ignore": "off",
            "@typescript-eslint/no-unused-expressions": "off"
        },
    },
]
