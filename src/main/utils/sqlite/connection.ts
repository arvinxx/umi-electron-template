import { app } from 'electron';
import type { EntityTarget } from 'typeorm';
import { createConnection, getConnection } from 'typeorm';
import path from 'path';
import { User } from '@/entities';
import { getLogger } from '@/utils';

/**
 * 获取数据库链接
 */
export const getDBConnection = async () => {
  // 数据库存储地址
  const storagePath = app.getPath('userData');

  const logger = getLogger('database');
  try {
    logger.info('连接数据库...');
    const connection = await createConnection({
      type: 'sqlite',
      database: path.join(storagePath, 'database', 'db.sqlite'),
      entities: [User],
    });
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
