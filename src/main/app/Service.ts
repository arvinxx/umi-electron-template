import { inject } from 'inversify';
import { SystemService, UserService } from '@/services';
import { logAfter, logBefore, provideSingleton } from '@/utils';
import { ipcMain } from 'electron';
import { CHANNELS } from '@/common';

@provideSingleton(Service)
export class Service {
  /** 服务类 * */

  @inject(UserService)
  user!: UserService;

  @inject(SystemService)
  system!: SystemService;

  /**
   * 处理所有服务的初始化
   */
  @logBefore('[服务]初始化服务...')
  @logAfter('[服务]初始化完成!')
  init() {
    // 服务上桥
    global.services = {
      user: this.user,
      system: this.system,
    };

    // 检查 macOS 权限上桥
    ipcMain.handle(
      CHANNELS.CHECK_ACCESSIBILITY_FOR_MAC_OS,
      this.system.checkAccessibilityForMacOS,
    );
  }
}
