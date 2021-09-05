import EventEmitter from 'events';
import type {
  BrowserWindowConstructorOptions} from 'electron';
import {
  app,
  BrowserWindow,
  protocol
} from 'electron';
import { dev } from 'electron-is';
import createProtocol from 'umi-plugin-electron-builder/lib/createProtocol';

import type { App } from '@/core/App';
import type { MainEvents } from '@/common/Events';

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

export interface BrowserWindowOpts extends BrowserWindowConstructorOptions {
  /**
   * URL
   */
  identifier: Main.WindowName;
  title?: string;
  width?: number;
  height?: number;
  devTools?: boolean;
  /**
   * 允许 renderer 进行使用 remote 模块
   */
  remote?: boolean;
}

export default class Browser extends EventEmitter {
  /**
   * 外部的 app
   * @private
   */
  private app: App;
  /**
   * 内部的 electron 窗口
   * @private
   */
  private _browserWindow?: BrowserWindow;

  /**
   * 标识符
   */
  identifier: string;

  /**
   * 生成时的选项
   */
  options: BrowserWindowOpts;

  /**
   * 对外暴露的获取窗口的方法
   */
  get browserWindow() {
    return this.retrieveOrInitialize();
  }

  /**
   * 构建 BrowserWindows 对象的方法
   * @param options
   * @param application
   */
  constructor(options: BrowserWindowOpts, application: App) {
    super();
    this.app = application;
    this.identifier = options.identifier;
    this.options = options;

    // 初始化
    this.retrieveOrInitialize();

    // 当关闭时将窗口实例销毁
    this.browserWindow.on('closed', () => {
      this.destroy();
    });
  }

  /**
   * 加载地址路径
   * @param name 在 renderer 中的路径名称
   */
  loadUrl = (name: Main.WindowName) => {
    const { PORT = 8000 } = process.env;

    if (dev()) {
      this.browserWindow.loadURL(`http://localhost:${PORT}/#/${name}`);
    } else {
      createProtocol('app');
      this.browserWindow.loadURL(`app://./${name}.html`);
    }
  };

  /**
   * 加载 Dev 工具
   */
  loadDevTools = () => {
    // 生产环境直接结束
    if (!(dev() || process.env.DEBUG === '1')) return;

    app.whenReady().then(() => {
      // TODO 集成 devton
      // devton 已经 N 年没更新了
      // 有人在重构 https://github.com/electron-userland/devtron/pull/221
      // 等重构完了再补

      const {
        default: installExtension,
        // React Dev tools 暂时没法修复 (Electron 版本 >= 9.0)
        // https://github.com/electron/electron/issues/23662
        // REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS,
        // eslint-disable-next-line global-require
      } = require('electron-devtools-installer');

      const extensions = [
        // REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS,
      ];

      try {
        installExtension(extensions).then((name: string) => {
          this.app.logger.trace(`Added Extension:  ${name}`);
        });
      } catch (e) {
        this.app.logger.error('An error occurred: ', e);
      }
    });
  };

  show() {
    this.browserWindow.show();
  }

  hide() {
    this.browserWindow.hide();
  }

  /**
   * 销毁实例
   */
  destroy() {
    this._browserWindow = undefined;
  }

  /**
   * 初始化
   */
  retrieveOrInitialize() {
    // 当有这个窗口 且这个窗口没有被注销时
    if (this._browserWindow && !this._browserWindow.isDestroyed()) {
      return this._browserWindow;
    }

    const { identifier, title, width, height, devTools, remote, ...res } =
      this.options;

    this._browserWindow = new BrowserWindow({
      ...res,
      width,
      height,
      title,

      webPreferences: {
        nodeIntegration: true,

        enableRemoteModule: remote,
        // 上下文隔离环境
        // https://www.electronjs.org/docs/tutorial/context-isolation
        contextIsolation: false,
        // devTools: isDev,
      },
    });

    this.loadUrl(identifier);

    this.loadDevTools();

    // 显示 devtools 就打开
    if (devTools) {
      this._browserWindow.webContents.openDevTools();
    }
    return this._browserWindow;
  }

  /**
   * 向 webview 派发事件
   * @param eventName
   * @param data
   */
  dispatchEvent<T extends keyof MainEvents>(
    eventName: T,
    data?: MainEvents[T],
  ) {
    let tempName = Math.random().toString(36).slice(-8);

    tempName = `a_${tempName}`;

    this.browserWindow.webContents.executeJavaScript(`
        const ${tempName} = new Event('electron:${eventName}');
        ${tempName}.data = ${JSON.stringify(data)};
        window.dispatchEvent(${tempName});
     `);
  }
}
