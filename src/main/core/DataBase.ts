import type { EntityTarget, Connection } from 'typeorm';
import { createConnection } from 'typeorm';

import Logger from '@/core/Logger';
import connectConfig from '@/databaseConfig';
import type { App } from '@/core/App';

export default class DataBase {
  private app: App;
  private connection?: Connection;

  constructor(app: App) {
    this.app = app;
  }
  /**
   * 获取数据库链接
   */
  connect = async () => {
    const logger = Logger.getLogger('database');

    try {
      logger.info('连接数据库...');
      this.app.browserManager.broadcast('initDatabase', 'loading');
      this.connection = await createConnection(connectConfig);
      logger.info('连接成功!');
      this.app.browserManager.broadcast('initDatabase', 'success');

      // 对数据库做一次同步 相当于初始化各种表
      // 否则会报 QueryFailedError: SQLITE_ERROR: no such table: User 错误
      await this.connection.synchronize();
    } catch (err) {
      logger.error('数据库初始化失败,错误信息:');
      logger.error(err);
      this.app.browserManager.broadcast('initDatabase', 'failed');
    }
  };

  getRepository<T>(entity: EntityTarget<T>) {
    return this.connection?.getRepository(entity);
  }
}
