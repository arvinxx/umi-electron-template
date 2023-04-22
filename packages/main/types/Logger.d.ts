declare namespace Main {
  import type { Logger as _Logger } from 'log4js';

  type Logger = _Logger;

  /**
   * 日志范围
   */
  type LogScope = 'database' | 'app' | 'renderer' | 'main' | 'error';
  type LogLevel = 'info' | 'error' | 'trace' | 'warn' | 'debug';

  type GetLogger = (scope?: LogScope) => Logger;

  type LogWithScope = (newScope: Main.LogScope, ...args: any[]) => void;
}
