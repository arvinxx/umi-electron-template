import chalk from 'chalk';
import { arch, cpus, platform, release, totalmem } from 'os';
import osName from 'os-name';
import { app } from 'electron';

import { isDev } from '@/common/utils';
import { getLogger } from './customLogger';

interface LogInfo {
  level: Main.LogLevel;
  message: string;
  key: Main.LogScope;
}

interface WithLogParams {
  before?: LogInfo | Function;
  after?: LogInfo | Function;
}

export { logBefore, logAfter } from './logDecorator';

export default class Logger {
  private logger: Main.Logger = getLogger('main');

  /**
   * 记录系统日志
   */
  logSystemInfo = () => {
    if (isDev) return;

    this.logger.divider('🚀');
    this.logger.info('开始启动 App...');

    this.logger.divider();
    this.logger.info(`操作系统： ${platform()} ${release()}(${arch()})`);
    this.logger.info(`系统版本：${osName()}`);
    this.logger.info(`处理器： ${cpus().length}核`);
    this.logger.info(
      `总内存： ${(totalmem() / 1024 / 1024 / 1024).toFixed(0)}G`,
    );
    this.logger.info(`安装路径：${app.getAppPath()}`);
    this.logger.divider();
  };

  /**
   * 给对象带上日志切面
   * @param before
   * @param after
   */
  static withLog =
    ({ before, after }: WithLogParams) =>
    (func: Function) => {
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

  info(msg: string) {
    this.logger.info(msg);
  }

  divider(msg: string) {
    this.logger.divider(msg);
  }

  static getLogger = getLogger;

  trace(...arg: any[]) {
    this.logger.trace(...arg);
  }

  error(...arg: any[]) {
    this.logger.error(...arg);
  }

  /**
   * 输出格式为: `[moduleName] 这是一条kitchen log...`
   */
  module(moduleName: string, ...args: any[]) {
    console.log(chalk.blue(`[${moduleName}]`), ...args);
  }

  data(...data: any[]) {
    console.log(chalk.grey(`[Data]`), ...data);
  }
}
