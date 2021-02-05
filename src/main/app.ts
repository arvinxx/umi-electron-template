import { getLogger } from '@/utils';
import container, { loadAsync } from '@/ioc';

import { UserService } from './services';
import { Logger } from './services';
import { HomeWindow } from '@/views';

const logger = getLogger('main');

const { logSystemInfo } = Logger;

/**
 * 初始化 App 声明周期
 */
export const initApp = async () => {
  await loadAsync();

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

  logger.info('app 初始化完毕!');
  logger.divider('🎉');
};
