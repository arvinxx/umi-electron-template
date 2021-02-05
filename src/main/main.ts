import { app } from 'electron';
import { initApp } from './app';
import { windows } from 'electron-is';

app.whenReady().then(initApp);

app.on('window-all-closed', () => {
  if (windows()) {
    app.quit();
  }
});
