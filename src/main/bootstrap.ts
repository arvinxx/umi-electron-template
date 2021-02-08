import { app, protocol } from 'electron';
import { dev } from 'electron-is';

import { createLogProxy } from '@/common';
import { getLogger } from '@/utils';
import container, { loadContainerAsync } from '@/ioc';
import { App } from '@/app';

/**
 * 初始化之前的操作
 */
const beforeInit = async () => {
  // 注册协议
  protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } },
  ]);

  // 控制单例
  const isSingle = app.requestSingleInstanceLock();
  if (!isSingle) {
    app.exit(0);
  }

  // 替换报错 logger
  if (!dev()) {
    console.error = createLogProxy('error', getLogger('error'))(console.error);
  }

  // 初始化数据库部分
  await loadContainerAsync();
};

/**
 * 启动方法
 */
export const bootstrap = async () => {
  await beforeInit();

  container.get(App);
};
