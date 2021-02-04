import { getLogger } from '@/utils';
import { initDBService } from '@/services';
import osName from 'os-name';
import { arch, cpus, platform, release, totalmem } from 'os';
import { app } from 'electron';

import { HomeWindow } from './views/windows';

const logger = getLogger('main');

/**
 * 初始化 App 方法
 */
export const initApp = () => {
  logger.divider('🚀');
  logger.info('开始启动 App...');

  logger.divider();
  logger.info(`操作系统： ${platform()} ${release()}(${arch()})`);
  logger.info(`系统版本：${osName()}`);
  logger.info(`处理器： ${cpus().length}核`);
  logger.info(`总内存： ${(totalmem() / 1024 / 1024 / 1024).toFixed(0)}G`);
  logger.info(`安装路径：${app.getAppPath()}`);

  logger.divider();
  logger.info('初始化数据库服务...');
  initDBService();
  logger.info('初始化完成!');

  logger.divider();
  logger.info('初始化视图');

  const home = new HomeWindow();
  home.windows.center();

  logger.info('app 初始化完毕!');
  logger.divider('🎉');
};
