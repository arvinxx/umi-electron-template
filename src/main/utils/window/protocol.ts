import { protocol } from 'electron';
import createProtocol from 'umi-plugin-electron-builder/lib/createProtocol';
import { dev } from 'electron-is';

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

/**
 * 加载地址路径
 * @param windows 窗口
 * @param name 在 renderer 中的路径名称
 */
export const loadUrl = (windows: Main.BrowserWindow, name: Main.WindowName) => {
  const { PORT = 8000 } = process.env;

  if (dev()) {
    windows.loadURL(`http://localhost:${PORT}/#/${name}`);
  } else {
    createProtocol('app');
    windows.loadURL(`app://./${name}.html`);
  }
};
