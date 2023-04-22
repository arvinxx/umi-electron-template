import log4js from 'log4js';

import config from './config';
import { GetLogger, LogLevel, LogScope, LogWithScope } from './types';

declare module 'log4js' {
  // 为 Logger 补充自定义方法
  export interface Logger {
    divider(symbol?: string, length?: number): void;

    logWithScope(newScope: LogScope, ...args: any[]): void;

    infoWithScope(newScope: LogScope, ...args: any[]): void;

    errorWithScope(newScope: LogScope, ...args: any[]): void;

    traceWithScope(newScope: LogScope, ...args: any[]): void;

    warnWithScope(newScope: LogScope, ...args: any[]): void;

    debugWithScope(newScope: LogScope, ...args: any[]): void;
  }
}

log4js.configure(config);

/**
 * 创建 withScope logger 代理
 * @param logLevel
 */
const withScopeFactory = (logLevel: LogLevel): LogWithScope => {
  return (newScope: LogScope, message: any, ...args: any[]) => {
    const logger = log4js.getLogger(newScope);
    logger[logLevel](message, ...args);
  };
};

export const getLogger: GetLogger = (scope) => {
  const logger = log4js.getLogger(scope);
  // 添加 divider 方法

  logger.divider = (str = '-', length = 10) => {
    let line = '';
    for (let i = 0; i < length; i += 1) {
      line += str;
    }
    logger.info(line);
  };

  // 添加 withScope 方法
  logger.infoWithScope = withScopeFactory('info');
  logger.errorWithScope = withScopeFactory('error');
  logger.traceWithScope = withScopeFactory('trace');
  logger.warnWithScope = withScopeFactory('warn');
  logger.debugWithScope = withScopeFactory('debug');

  return logger;
};

export const logger = getLogger();
