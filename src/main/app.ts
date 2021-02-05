import { getLogger } from '@/utils';
import { initDBService } from '@/services';

import { HomeWindow } from './views/windows';
import { Logger } from './services';

const logger = getLogger('main');

const { initApp: init, withLog } = Logger;

/**
 * 初始化 App 方法
 */
export const initApp = () => {
  init();

  withLog({
    before: () => logger.info('初始化数据库服务...'),
    after: () => logger.info('初始化完成!'),
  })(initDBService);

  withLog({
    before: () => {
      logger.divider();
      logger.info('初始化视图');
    },
    after: () => {
      logger.info('app 初始化完毕!');
      logger.divider('🎉');
    },
  })(() => {
    const home = new HomeWindow();
    home.windows.center();
  });
};
