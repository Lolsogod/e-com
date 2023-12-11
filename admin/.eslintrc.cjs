module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:warn',
    'plugin:@typescript-eslint/warn',
    'plugin:react-hooks/warn',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
