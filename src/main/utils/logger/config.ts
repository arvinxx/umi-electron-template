import { app } from 'electron';
import { join } from 'path';

import type { Configuration, Layout } from 'log4js';
import { isDev } from '@/common';

const logDir = join(app.getPath('userData'), 'Logs');

const level = isDev ? 'trace' : 'info';

// 自定义日志格式
const layout: Layout = {
  type: 'pattern',
  pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %m',
};

const config: Configuration = {
  appenders: {
    // 控制台输出
    console: { type: 'console' },
    // 日志文件
    app: {
      type: 'file',
      filename: join(logDir, 'app', 'log.log'),
      pattern: '.yyyy-MM-dd', // 日志切割后文件名后缀格式
    },
    // 数据库日志
    database: {
      type: 'file',
      filename: join(logDir, 'database', 'log.log'),
      pattern: '.yyyy-MM-dd', // 日志切割后文件名后缀格式
      layout,
    },
  },
  categories: {
    default: { appenders: ['app', 'console'], level },
    app: { appenders: ['app', 'console'], level },
    main: { appenders: ['app', 'console'], level },
    renderer: { appenders: ['app', 'console'], level },
    // 数据库日志
    database: { appenders: ['database'], level },
  },
};

export default config;
