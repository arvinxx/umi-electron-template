import { app } from 'electron';
import type { Connection } from 'typeorm';
import { createConnection } from 'typeorm';
import path from 'path';

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
    this.connection = await createConnection({
      type: 'sqlite',
      database: path.join(this.storagePath, 'db.sqlite'),
      entities,
    });

    if (this.connection.isConnected) {
      await this.connection.synchronize();
    }
  }
}
