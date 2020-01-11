module.exports = {
    root: true,

    env: {
        node: true
    },

    parserOptions: {
        parser: 'babel-eslint'
    },

    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "prettier/vue",
        "plugin:prettier/recommended",
        "plugin:cypress/recommended"
    ],

    // add your custom rules here
    rules: {
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "no-unused-vars": [2, {"args": "all", "argsIgnorePattern": "^_"}],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "vue/no-v-html": "off"
    },

    globals: {
        $nuxt: true
    },

    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}
