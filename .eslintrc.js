module.exports = {
  extends: 'lei',
  'rules': {
  //   "promise/catch-or-return": "off",
  //   "semi": [ "error", "always" ],
  //   "quotes": [ "error", "double" ],
    'no-empty': [ 'error', { 'allowEmptyCatch': true }],
    'no-param-reassign': [ 'error', { 'props': false }],
  },
  globals: {
    $: true,
    Config: true,
    dataSDK: true,
    Wechat: true,
    window: true,
    Util: true,
    BaseClass: true,
    BasePopupClass: true,
  },
    // 环境定义了预定义的全局变量。
  'env': {
        // 环境定义了预定义的全局变量。更多在官网查看
    'browser': true,
    'node': true,
    'commonjs': true,
    'amd': true,
    'es6': true,
    'mocha': true,
  },
    // JavaScript 语言选项
  'parserOptions': {
        // ECMAScript 版本
    'ecmaVersion': 6,
    'sourceType': 'script', // module
        // 想使用的额外的语言特性:
    'ecmaFeatures': {
            // 允许在全局作用域下使用 return 语句
      'globalReturn': true,
            // impliedStric
      'impliedStrict': true,
            // 启用 JSX
      'jsx': true,
    },
  },

    /**
     *  "off" 或 0 - 关闭规则
     *  "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     *  "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */

};
