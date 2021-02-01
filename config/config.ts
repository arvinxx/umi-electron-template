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
      path: '/home',
      wrappers: ['@/renderer/layouts/BaseLayout'],
      component: '@/renderer/pages/index',
    },
  ],
  fastRefresh: {},
  electronBuilder: {
    outputDir: 'release',
    builderOptions: ElectronBuilderOpts,
  },
  alias: {
    '@/hooks': resolve(__dirname, '../src/renderer/hooks'),
    '@/common': resolve(__dirname, '../src/common'),
    theme: resolve(__dirname, '../src/renderer/theme'), // less 全局样式文件
  },
});
