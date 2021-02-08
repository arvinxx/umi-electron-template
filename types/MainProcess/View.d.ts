declare namespace Main {
  import type { HomeWindow } from '../../src/main/views';

  export type BrowserWindow = Electron.BrowserWindow;

  /**
   * 窗口服务
   */
  interface Windows {
    home: HomeWindow;
  }

  /**
   * 窗口类型
   */
  export type WindowName = 'home';
}

declare namespace NodeJS {
  interface Global {
    windows: Main.Windows;
  }
}
