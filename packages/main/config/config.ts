import { defineConfig } from '@umijs/max';
import { readJSONSync } from 'fs-extra';
import { resolve } from 'path';
import { LogType } from 'umi-plugin-electron-builder/lib/types';

import { handleLog, srcPath } from './utils';

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
    parallelBuild: true,
    buildType: 'webpack',
    mainSrc: 'src', //默认主进程目录
    preloadSrc: resolve(srcPath, 'preload/src'), //默认preload目录，可选，不需要可删除
    outputDir: '../../release',
    builderOptions: ElectronBuilderOpts,
    externals,
    // @ts-ignore
    logProcess: (log: string, type: LogType) => {
      if (type === 'normal') {
        handleLog(log.trim());
      } else if (type === 'error') {
        console.error(log.trim());
      }
    },
  },
});
