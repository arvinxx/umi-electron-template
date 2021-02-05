import type { UserService } from '../../src/main/services';

declare global {
  namespace Main {
    interface Repository {
      user: UserService;
    }
  }

  namespace NodeJS {
    interface Global {
      repository: {
        user: UserService;
      };
    }
  }
}
