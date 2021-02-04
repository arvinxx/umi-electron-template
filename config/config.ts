import { defineConfig } from 'umi';
import ElectronBuilderOpts from './electronBuilderOpts';
import { resolve } from 'path';
import theme from '../src/renderer/theme/theme';

const isDev = process.env.NODE_ENV === 'development';

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
   * 因此直接开启 mpa 参数即变成多页应用
   * 需要注意的是在 dev 时越需要加 .html 后缀
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
    // 必须将 sqlite3 external 否则无法使用
    externals: ['sqlite3', 'typeorm', 'reflect-metadata'],
  },
  alias: {
    '@/hooks': resolve(__dirname, '../src/renderer/hooks'),
    '@/bridge': resolve(__dirname, '../src/renderer/bridge'),
    '@/utils': resolve(__dirname, '../src/renderer/utils'),
    '@/common': resolve(__dirname, '../src/common'),
    theme: resolve(__dirname, '../src/renderer/theme'), // less 全局样式文件
  },
});
