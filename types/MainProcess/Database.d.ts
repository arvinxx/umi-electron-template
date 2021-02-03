declare namespace Main {
  import type { UserService } from '../../src/main/services/User';

  interface DataBase {
    user: UserService;
  }
}
