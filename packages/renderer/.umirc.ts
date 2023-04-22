import { defineConfig } from '@umijs/max';
import { resolve } from 'path';

export default defineConfig({
  npmClient: 'pnpm',
  mpa: {
    layout: '@/layouts/BasicLayout',
  },
  outputPath: resolve(__dirname, '../main/dist/renderer'),
  monorepoRedirect: {},
});
