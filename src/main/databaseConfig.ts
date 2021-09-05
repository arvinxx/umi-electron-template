import type { ConnectionOptions } from 'typeorm';
import { isDev, isTest } from '@/common/utils';
import path from 'path';
import { User } from '@/models';
import { app } from 'electron';

const entities = [User];

// 数据库存储地址
const storagePath = app.getPath('userData');

const connectConfig: ConnectionOptions = {
  type: 'sqlite',
  entities,
  database:
    // 测试下使用内存数据库
    /* istanbul ignore next */
    isTest
      ? ':memory:'
      : path.join(
          storagePath,
          'database',
          `${isDev ? 'umi-electron-template' : 'db'}.sqlite`,
        ),
};

export default connectConfig;
