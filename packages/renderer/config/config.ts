import { defineConfig } from '@umijs/max';
import { resolve } from 'path';
import { packagesPath } from './utils';
import routes from './routes';

const releasePath = resolve(packagesPath, '../release');

export default defineConfig({
  npmClient: 'pnpm',
  routes,
  exportStatic: {},

  // renderer 部分相对根目录的输出路径为 ../..
  outputPath: releasePath,

  monorepoRedirect: {},
  alias: {
    theme: resolve(__dirname, '../src/theme'), // less 全局样式文件
  },
});
