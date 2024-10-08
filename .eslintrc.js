module.exports = {
    parser: '@typescript-eslint/parser', // 使用 TypeScript 解析器
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential',
      'plugin:@typescript-eslint/recommended', // 添加 TypeScript 推荐规则
      'plugin:prettier/recommended' // 避免 Prettier 和 ESLint 冲突
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      // 可以在此处添加其他规则
    }
  }