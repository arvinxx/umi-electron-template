import { BrowserWindow } from 'electron';
import { loadUrl, loadDevTools } from '@/utils';

interface WindowCreatorOpts {
  url: Main.WindowName;
  title?: string;
  width?: number;
  height?: number;
  devTools?: boolean;
  /**
   * 允许 renderer 进行使用 remote 模块
   */
  remote?: boolean;
}

/**
 * 构建 BrowserWindows 对象的方法
 * @param opts { WindowCreatorOpts }
 */
export const windowCreator = (opts: WindowCreatorOpts) => {
  const { url, title, width, height, devTools, remote } = opts;
  const windows = new BrowserWindow({
    width,
    height,
    title,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: remote,
      // devTools: dev(),
    },
  });

  loadUrl(windows, url);

  loadDevTools();

  // 显示 devtools 就打开
  if (devTools) {
    windows.webContents.openDevTools();
  }

  return windows;
};
