module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    es2017: true,
    es2020: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module', // script或者module
    ecmaVersion: 'latest', // 6 7 8 9
    ecmaFeatures: {
      globalReturn: false, // 允许在全局作用域下使用 return 语句
      jsx: true, // 启用 jsx
      impliedStrict: false, // 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
      experimentalObjectRestSpread: false // 启用实验性的 object rest/spread properties 支持
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  // 这是全局变量，找不到引用也可以用
  globals: {
    vConsole: true,
    uni: true,
    plus: true,
    wx: true,
    ROUTES: true,
    getCurrentPages: true
  }
}
