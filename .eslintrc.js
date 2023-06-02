module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint-config-zemoso',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  root: true,
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'no-var': 'warn',
    camelcase: 'off',
    'array-callback-return': 'off',
    'object-curly-spacing': ['warn', 'always'],
  },
};
