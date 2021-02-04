import { database } from '@/bridge';

/**
 * 获取数据库
 */
export const useDatabase = () => {
  const { user } = database;

  return { user };
};
