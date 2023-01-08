import { autoUpdater } from 'electron-updater';

export class AppUpdater {
  constructor() {
    autoUpdater.checkForUpdatesAndNotify();
  }
}
