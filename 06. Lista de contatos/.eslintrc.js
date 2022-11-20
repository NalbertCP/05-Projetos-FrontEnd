module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "comma-spacing": ["error", {before: false, after: true}],
        "key-spacing": ["error", {beforeColon: false, afterColon: true}],
        "quotes": ["error", "double"],
        "comma-dangle": ["error", "never"]
    }
}
