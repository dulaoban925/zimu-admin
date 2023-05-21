/**
 * 使用 cjs 文件后缀
 * 因为 package.json 设置了 type：”module“，而 prettier 暂未支持
 * issue: https://github.com/prettier/prettier/issues/12701
 * 计划 v3 版本支持
 */
module.exports = {
  // 语句结尾不加分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象或数组末尾不加逗号
  trailingComma: 'none',
  // 箭头函数单一参数省略括号
  arrowParens: 'avoid',
  // 行结尾换行格式
  endOfLine: 'auto'
}