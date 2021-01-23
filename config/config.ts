import { defineConfig } from 'umi';
import ElectronBuilderOpts from './electronBuilderOpts';
import { resolve } from 'path';
import theme from '../src/theme/theme';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme,
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  electronBuilder: {
    outputDir: 'release',
    builderOptions: ElectronBuilderOpts,
  },
  alias: {
    theme: resolve(__dirname, '../src/theme'), // less 全局样式文件
  },
});
