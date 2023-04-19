module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }

  // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development
  // quotes: [1, 'single'], // 引号类型 `` "" ''
  // 'no-extra-semi': 2, // 禁止多余的冒号
  // 'space-before-function-paren': [0, 'always'] // 函数定义时括号前面要不要有空格
}
