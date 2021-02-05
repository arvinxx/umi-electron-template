import { app } from 'electron';
import { initApp } from './app';
import { dev, windows } from 'electron-is';

import { createLogProxy } from '@/common';
import { getLogger } from '@/utils';

const logger = getLogger('main');

if (!dev()) {
  console.error = createLogProxy('error', logger)(console.error);
}

app.whenReady().then(initApp);

app.on('window-all-closed', () => {
  if (windows()) {
    app.quit();
  }
});
