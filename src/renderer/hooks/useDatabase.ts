import { remote } from 'electron';

/**
 * 获取数据库
 */
export const useDatabase = () => {
  const database: Main.DataBase = remote.getGlobal('database');

  const { user } = database;

  return { user };
};
