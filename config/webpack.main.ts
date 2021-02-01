const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

// @ts-ignore
module.exports = (config) => {
  config.optimization.noEmitOnErrors = false;
  // ts-loader 中只汇报 main 端的 ts 文件
  // 从而修复报 Renderer typing 错误问题
  config.resolve.alias = {
    '@/common': path.resolve(__dirname, '../src/common'),
    '@': path.resolve(__dirname, '../src/main'),
  };

  config.module.rules[3].use[0].options = {
    transpileOnly: isDev,
    configFile: path.resolve(__dirname, '../src/main', 'tsconfig.json'),
  };
  // ForkTsCheckerWebpackPlugin 插件在插件队列中的最后
  // 所以在正常 dev 和 local 测试环境下，不开启该功能
  if (isDev) {
    config.plugins.pop();
  }
  return config;
};
