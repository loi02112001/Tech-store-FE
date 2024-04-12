module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "simple-import-sort", "prettier", "unused-imports"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/prop-types": 0,
    "react-hooks/exhaustive-deps": 0,
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        bracketSameLine: true,
        semi: false,
        singleQuote: false,
        jsxSingleQuote: false,
        quoteProps: "as-needed",
        trailingComma: "all",
        singleAttributePerLine: false,
        htmlWhitespaceSensitivity: "css",
        vueIndentScriptAndStyle: false,
        proseWrap: "preserve",
        tabWidth: 2,
        useTabs: false,
        embeddedLanguageFormatting: "auto",
      },
    ],
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Packages `react` related packages come first.
          ["^react", "^@?w"],
          // Internal packages.
          ["^(@|src)(/.*|$)"],
          // Side effect imports.
          ["^u0000"],
          // Parent imports. Put `..` last.
          ["^..(?!/?$)", "^../?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^./(?=.*/)(?!/?$)", "^.(?!/?$)", "^./?$"],
          // Style imports.
          ["^.+.?(css)$"],
        ],
      },
    ],
  },
}
