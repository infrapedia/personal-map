module.exports = {
  root: true,
  env: { node: true, browser: true, es6: true },
  rules: {
    semi: 'off',
    quotes: ['error', 'single'],
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  extends: 'eslint:recommended',
  parserOptions: { ecmaVersion: 6, sourceType: 'module' }
}
