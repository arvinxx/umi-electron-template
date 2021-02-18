import { srcPath, isDev } from './utils';

const { resolve } = require('path');

// @ts-ignore
module.exports = (config) => {
  config.optimization.noEmitOnErrors = false;
  config.resolve.alias = {
    '@/common': resolve(srcPath, 'common'),
    '@': resolve(srcPath, 'main'),
  };

  // ts-loader 中只汇报 main 端的 ts 文件
  // 从而修复报 Renderer typing 错误问题
  config.module.rules[3].use[0].options = {
    transpileOnly: isDev,
    configFile: resolve(srcPath, 'main', 'tsconfig.json'),
  };
  // ForkTsCheckerWebpackPlugin 插件在插件队列中的最后
  // 所以在正常 dev 和 local 测试环境下，不开启该功能
  if (isDev) {
    config.plugins.pop();
  }
  return config;
};
