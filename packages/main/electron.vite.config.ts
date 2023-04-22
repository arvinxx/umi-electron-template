import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { join } from 'node:path';
import { preload } from 'unplugin-auto-expose';

const isDev = process.env.MODE !== 'development';

// electron 24 版本使用 node18
const target = 'node18';

const externalPlugin = externalizeDepsPlugin({
  include: ['builder-util-runtime', 'umi-request'],
});

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': join(__dirname, 'src/'),
        '@umi-electron-template/common': join(__dirname, '../common/src'),
      },
    },
    build: {
      ssr: true,
      sourcemap: 'inline',
      minify: !isDev,
      target,
      lib: {
        entry: 'src/index.ts',
      },
      outDir: 'dist/main',
      emptyOutDir: true,
    },
    plugins: [externalPlugin],
  },
  preload: {
    build: {
      ssr: true,
      sourcemap: 'inline',
      target,
      minify: !isDev,
      lib: {
        entry: join(__dirname, '../preload/src/index.ts'),
      },
      outDir: 'dist/preload',
      emptyOutDir: true,
    },
    plugins: [preload.vite(), externalPlugin],
  },

  // 忽略 renderer 的构建
  renderer: {
    root: 'scripts',
    build: {
      rollupOptions: {
        input: 'scripts/zombieRender/index.html',
      },
      outDir: 'node_modules/.cache/electron-vite/renderer',
    },
  },
});
