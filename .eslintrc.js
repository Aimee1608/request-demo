module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    wx: true
  },
  extends: [
    'standard'
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: [2, 'always'],
    'no-console': 'off',
    'no-prototype-builtins': 0,
    'space-before-function-paren': 0,
    'no-useless-catch': 0,
    camelcase: [1, { properties: 'never' }]
  }
};
