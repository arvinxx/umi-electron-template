import { AppUpdater, getLogger } from '@/utils';
import container, { loadContainerAsync } from '@/ioc';

import { UserService } from './services';
import { Logger } from './services';
import { HomeWindow } from '@/views';

const logger = getLogger('main');

const { logSystemInfo } = Logger;

const beforeInit = async () => {
  await loadContainerAsync();
};

/**
 * 初始化 App 声明周期
 */
export const initApp = async () => {
  await beforeInit();

  logSystemInfo();

  logger.info('挂载数据仓库服务...');
  const user = container.get(UserService);

  global.repository = {
    user,
  };

  logger.info('挂载完成!');

  logger.divider();

  logger.info('初始化视图');
  const home = container.get(HomeWindow);
  home.show();

  container.get(AppUpdater);

  logger.info('app 初始化完毕!');
  logger.divider('🎉');
};
