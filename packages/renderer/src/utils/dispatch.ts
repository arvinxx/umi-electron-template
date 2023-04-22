import type { RendererEvents } from '@umi-electron-template/common';

/**
 * webview 端请求 sketch 端 event 数据的方法
 */
export const dispatch = async <T extends keyof RendererEvents>(
  event: T,
  ...data: any[]
): Promise<RendererEvents[T]> => {
  return;
  const ipcRenderer = require('electron').ipcRenderer;
  return await ipcRenderer.invoke(event, ...data);
};
