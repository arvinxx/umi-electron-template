import { isDev } from '@/common';
import { arch, cpus, platform, release, totalmem } from 'os';
import osName from 'os-name';
import { app } from 'electron';
import { getLogger } from '@/utils';

interface LogInfo {
  level: Main.LogLevel;
  message: string;
  key: Main.LogScope;
}

interface WithLogParams {
  before?: LogInfo | Function;
  after?: LogInfo | Function;
}

export class Logger {
  /**
   * 记录系统日志
   */
  static logSystemInfo = () => {
    if (isDev) return;

    const logger = getLogger('main');
    logger.divider('🚀');
    logger.info('开始启动 App...');

    logger.divider();
    logger.info(`操作系统： ${platform()} ${release()}(${arch()})`);
    logger.info(`系统版本：${osName()}`);
    logger.info(`处理器： ${cpus().length}核`);
    logger.info(`总内存： ${(totalmem() / 1024 / 1024 / 1024).toFixed(0)}G`);
    logger.info(`安装路径：${app.getAppPath()}`);
    logger.divider();
  };

  /**
   * 给对象带上日志切面
   * @param before
   * @param after
   */
  static withLog = ({ before, after }: WithLogParams) => (func: Function) => {
    if (before) {
      if (typeof before === 'function') {
        before();
      } else {
        const logger = getLogger(before.key);
        logger[before.level](before.message);
      }
    }

    func();

    if (after) {
      if (typeof after === 'function') {
        after();
      } else {
        const logger = getLogger(after.key);
        logger[after.level](after.message);
      }
    }
  };
}
