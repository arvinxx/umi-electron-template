import { BrowserWindow } from 'electron';
import { loadUrl, loadDevTools } from '@/utils';

export interface WindowOpts {
  /**
   * URL
   */
  name: Main.WindowName;
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
 * @param opts { WindowOpts }
 */
class WindowManger {
  windows: Main.BrowserWindow;

  constructor(opts: WindowOpts) {
    const { name, title, width, height, devTools, remote } = opts;
    this.windows = new BrowserWindow({
      width,
      height,
      title,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: remote,
        // 上下文隔离环境
        // https://www.electronjs.org/docs/tutorial/context-isolation
        // contextIsolation: true,
        // devTools: dev(),
      },
    });

    loadUrl(this.windows, name);

    loadDevTools();

    // 显示 devtools 就打开
    if (devTools) {
      this.windows.webContents.openDevTools();
    }
  }
}

export default WindowManger;
