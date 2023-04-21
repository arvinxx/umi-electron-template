import { isDev, isTest } from '@umi-electron-template/common/src/utils';
import { app } from 'electron';
import path from 'path';
import type { ConnectionOptions } from 'typeorm';
import { User } from './models';

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
