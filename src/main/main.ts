import { app } from 'electron';

import { windowCreator } from '@/utils';
import { initDBService } from '@/services';

let mainWindow: Main.BrowserWindow;

app.whenReady().then(() => {
  mainWindow = windowCreator({ url: 'home', remote: true });

  // 初始化数据库服务
  initDBService();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = windowCreator({ url: 'home', title: 'Umi Electron Template' });
  }
});
