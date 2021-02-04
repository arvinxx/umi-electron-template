import type { Logger } from 'log4js';
import log4js from 'log4js';

import config from './config';

declare module 'log4js' {
  // 为 Logger 补充自定义方法
  export interface Logger {
    divider: (symbol?: string, length?: number) => void;
  }
}

log4js.configure(config);

export const getLogger: Main.GetLogger = (scope) => {
  const logger = log4js.getLogger(scope);
  logger.divider = (str = '-', length = 10) => {
    let line = '';
    for (let i = 0; i < length; i += 1) {
      line += str;
    }
    logger.info(line);
  };
  return logger;
};

export const logger = getLogger();

declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger;
      getLogger: Main.GetLogger;
    }
  }
}

global.logger = logger;
global.getLogger = getLogger;
