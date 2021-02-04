import { defineConfig } from 'umi';
import ElectronBuilderOpts from './electronBuilderOpts';
import { resolve } from 'path';
import { readJSONSync } from 'fs-extra';

import theme from '../src/renderer/theme/theme';

const isDev = process.env.NODE_ENV === 'development';

// 必须将作为node的依赖，例如 sqlite3、typeORM 等 external 掉
// 否则无法使用
const pkg = readJSONSync(resolve(__dirname, '../package.json'));
const deps = pkg.dependencies;
const externals = Object.keys(deps);

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // React Dev tools 暂时没法修复 (Electron 版本 >= 9.0)
  // https://github.com/electron/electron/issues/23662
  // 所以使用 react-devtools 独立版本
  // 需要添加 <script src="http://localhost:8097"></script>
  scripts: isDev ? ['http://localhost:8097'] : undefined,
  theme,
  routes: [
    {
      path: '/',
      component: '@/renderer/layouts/BaseLayout',
      routes: [
        {
          path: '/home',
          component: '@/renderer/pages/home',
        },
        {
          path: '/database',
          component: '@/renderer/pages/database',
        },
      ],
    },
  ],
  /**
   * electron 默认情况下应该其实就是 mpa 环境
   * 但是直接使用 umi 的 mpa 方法会丢失全局 Layout
   * 因此使用 exportStatic 间接实现 mpa
   */
  exportStatic: isDev
    ? undefined
    : {
        htmlSuffix: true,
        dynamicRoot: true,
      },
  fastRefresh: {},
  electronBuilder: {
    routerMode: isDev ? 'hash' : 'browser',
    outputDir: 'release',
    builderOptions: ElectronBuilderOpts,
    externals,
  },
  alias: {
    '@/hooks': resolve(__dirname, '../src/renderer/hooks'),
    '@/bridge': resolve(__dirname, '../src/renderer/bridge'),
    '@/utils': resolve(__dirname, '../src/renderer/utils'),
    '@/common': resolve(__dirname, '../src/common'),
    theme: resolve(__dirname, '../src/renderer/theme'), // less 全局样式文件
  },
});
