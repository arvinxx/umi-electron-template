declare namespace Main {
  import type { UserService } from '../../src/main/services';

  interface Repository {
    user: UserService;
  }
}

declare namespace NodeJS {
  import type { UserService } from '../../src/main/services';

  interface Global {
    repository: {
      user: UserService;
    };
  }
}
