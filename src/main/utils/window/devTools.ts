import { app } from 'electron';
import { dev } from 'electron-is';
import { logger } from '@/utils';

/**
 *  加载插件和开发者工具窗口
 */
export const loadDevTools = () => {
  // 生产环境直接结束
  if (!(dev() || process.env.DEBUG === '1')) return;

  app.whenReady().then(() => {
    // TODO 集成 devton
    // devton 已经 N 年没更新了
    // 有人在重构 https://github.com/electron-userland/devtron/pull/221
    // 等重构完了再补

    const {
      default: installExtension,
      // React Dev tools 暂时没法修复 (Electron 版本 >= 9.0)
      // https://github.com/electron/electron/issues/23662
      // REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
      // eslint-disable-next-line global-require
    } = require('electron-devtools-installer');

    const extensions = [
      // REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    ];

    try {
      installExtension(extensions).then((name: string) => {
        logger.trace(`Added Extension:  ${name}`);
      });
    } catch (e) {
      logger.error('An error occurred: ', e);
    }
  });
};
