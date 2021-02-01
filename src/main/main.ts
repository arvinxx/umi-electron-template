import { app } from 'electron';
import { windowCreator } from '@/utils';

let mainWindow: Main.BrowserWindow;

app.whenReady().then(() => {
  mainWindow = windowCreator({ url: 'home' });
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
