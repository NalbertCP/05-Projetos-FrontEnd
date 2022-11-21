module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "plugin:prettier/recommended"
    ],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                trailingComma: "none",
                semi: false,
                tabWidth: 4,
                endOfLine: "auto",
                printWidth: 100
            }
        ]
    }
}
