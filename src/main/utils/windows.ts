import { BrowserWindow } from 'electron';
import { loadUrl } from '@/utils/protocol';
// import { dev } from 'electron-is';
import { loadDevTools } from '@/utils/devTools';

interface WindowCreatorOpts {
  url: Main.WindowName;
  title?: string;
  width?: number;
  height?: number;
  devTools?: boolean;
}

/**
 * 构建 BrowserWindows 对象的方法
 * @param opts { WindowCreatorOpts }
 */
export const windowCreator = (opts: WindowCreatorOpts) => {
  const { url, title, width, height, devTools } = opts;
  const windows = new BrowserWindow({
    width,
    height,
    title,
    webPreferences: {
      nodeIntegration: true,
      // enableRemoteModule: dev(),
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
