import { app } from 'electron';
import type { Connection } from 'typeorm';
import { createConnection } from 'typeorm';
import path from 'path';
import { getLogger } from './logger';

const logger = getLogger('database');
/**
 * 数据管理方法
 */
export class DatabaseManger {
  /**
   * 数据库存储地址
   */
  storagePath: string = app.getPath('userData');

  protected connection!: Connection;

  constructor(entities: any[]) {
    this.init(entities);
  }

  public async init(entities: any[]): Promise<void> {
    logger.trace('开始连接数据库...');
    await createConnection({
      type: 'sqlite',
      database: path.join(this.storagePath, 'database', 'db.sqlite'),
      entities,
    })
      .then((connection) => {
        this.connection = connection;
        logger.trace('数据库初始化成功!');
      })
      .catch((err) => {
        logger.error('数据库初始化失败,错误信息:');
        logger.error(err);
      });

    if (this.connection.isConnected) {
      await this.connection.synchronize();
    }
  }
}
