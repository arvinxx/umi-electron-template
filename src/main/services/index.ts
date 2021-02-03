import { UserService } from './User';

declare global {
  namespace NodeJS {
    interface Global {
      database: {
        user: UserService;
      };
    }
  }
}

export const initDBService = () => {
  global.database = {
    user: new UserService(),
  };
};
