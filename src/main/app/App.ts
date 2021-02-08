import { inject } from 'inversify';
import { app } from 'electron';
import { windows } from 'electron-is';
import { Logger } from '@/services';
import { getLogger, provideSingleton } from '@/utils';

import { Service } from './Service';
import { View } from './View';

const logger = getLogger('main');

@provideSingleton(App)
export class App {
  constructor() {
    app.whenReady().then(() => {
      Logger.logSystemInfo();

      this.services.init();

      this.views.init();

      logger.info('app 初始化完毕!');
      logger.divider('🎉');
    });

    app.on('window-all-closed', () => {
      if (windows()) {
        app.quit();
      }
    });

    app.on('activate', this.onActivate);

    app.on('before-quit', () => {
      this.beforeQuit();
      app.exit();
    });
  }

  @inject(View)
  views!: View;

  @inject(Service)
  services!: Service;

  onActivate = () => {
    this.views.home.show();
  };

  beforeQuit() {}
}
