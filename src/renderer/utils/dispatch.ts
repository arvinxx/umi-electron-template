import type { RendererEvents } from '@/common/Events';
import { ipcRenderer } from 'electron';

/**
 * webview 端请求 sketch 端 event 数据的方法
 */
export const dispatch = async <T extends keyof RendererEvents>(
  event: T,
  ...data: any[]
): Promise<RendererEvents[T]> => await ipcRenderer.invoke(event, ...data);
