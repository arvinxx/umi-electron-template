declare namespace Main {
  import type { UserService, SystemService } from '../../src/main/services';

  /**
   * Electron 支持的服务
   */
  interface Services {
    user: UserService;
    system: SystemService;
  }
}

declare namespace NodeJS {
  interface Global {
    services: Main.Services;
  }
}
