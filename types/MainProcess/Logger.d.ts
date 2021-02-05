declare namespace Main {
  import type { Logger as _Logger } from 'log4js';

  type Logger = _Logger;

  /**
   * 日志范围
   */
  type LogScope = 'database' | 'app' | 'renderer' | 'main';
  type LogLevel = 'info' | 'error' | 'trace' | 'warning' | 'debug';

  type GetLogger = (scope?: LogScope) => Logger;
}
