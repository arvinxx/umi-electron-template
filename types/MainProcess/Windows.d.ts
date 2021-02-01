declare namespace Main {
  export type BrowserWindow = Electron.BrowserWindow;

  /**
   * 窗口
   */
  export type Windows = () => BrowserWindow;

  /**
   * 窗口类型
   */
  export type WindowName = 'home';
}
