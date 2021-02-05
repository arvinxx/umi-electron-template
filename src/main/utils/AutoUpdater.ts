import { autoUpdater } from 'electron-updater';
import { provide } from 'inversify-binding-decorators';

@provide(AppUpdater)
export class AppUpdater {
  constructor() {
    autoUpdater.checkForUpdatesAndNotify();
  }
}
