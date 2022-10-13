module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'promise/param-names': 'off',
    'vue/multi-word-component-names': 'off',
    eqeqeq: ['off', 'always'],
    camelcase: 'off',
    'new-cap': 'off',
    'brace-style': 'off',
    'prefer-promise-reject-errors': 'off'

  }
}
