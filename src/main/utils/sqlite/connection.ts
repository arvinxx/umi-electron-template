import { app } from 'electron';
import type { ConnectionOptions, EntityTarget } from 'typeorm';
import { createConnection, getConnection } from 'typeorm';
import path from 'path';
import { User } from '@/models';
import { getLogger } from '@/utils';
import { isTest } from '@/common';

const entities = [User];

// 数据库存储地址
const storagePath = app.getPath('userData');

const connectConfig: ConnectionOptions = {
  type: 'sqlite',
  entities,
  database:
    // 测试下使用内存数据库
    /* istanbul ignore next */
    isTest ? ':memory:' : path.join(storagePath, 'database', 'db.sqlite'),
  synchronize: isTest,
  dropSchema: isTest,
};
/**
 * 获取数据库链接
 */
export const getDBConnection = async () => {
  const logger = getLogger('database');
  try {
    logger.info('连接数据库...');
    const connection = await createConnection(connectConfig);
    logger.info('连接成功!');
    return connection;
  } catch (err) {
    logger.error('数据库初始化失败,错误信息:');
    logger.error(err);
    return undefined;
  }
};

/**
 * 获取某个仓库值
 * @param entity
 */
export function getRepository<T>(entity: EntityTarget<T>) {
  const conn = getConnection();
  return conn.getRepository(entity);
}
