import { defineConfig } from '@umijs/max';
import { join, resolve } from 'path';
import { readJSONSync } from 'fs-extra';
import { srcPath, isDev } from './utils';

import ElectronBuilderOpts from './electronBuilderOpts';

// 必须将作为node的依赖，例如 sqlite3、typeORM 等 external 掉
// 否则无法使用
const pkg = readJSONSync(resolve(srcPath, './main/package.json'));
const deps = pkg.dependencies;
const externals = Object.keys(deps);

export default defineConfig({
  npmClient: 'pnpm',
  plugins: ['umi-plugin-electron-builder'],

  electronBuilder: {
    // vite 和 typeorm 暂时还不兼容
    // https://github.com/BySlin/umi-plugin-electron-builder/issues/23
    buildType: 'webpack',
    mainSrc: 'src', //默认主进程目录
    // preloadSrc: resolve(srcPath, 'preload/src'), //默认preload目录，可选，不需要可删除
    outputDir: '../../release',
    builderOptions: ElectronBuilderOpts,
    externals,
    mainWebpackChain: () => {
      // memo.entryPoints.delete('main');
      // console.log(memo.context());
    },
  },
});
