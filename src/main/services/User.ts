import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';
import { Repository } from 'typeorm';

import type { User } from '@/models';
import TYPES from '@/ioc/types';

@provide(UserService)
export class UserService {
  @inject(TYPES.UserRepository) private model!: Repository<User>;

  /**
   * 创建对象
   * @param name
   * @param surname
   */
  public insert(name: string, surname: string): Promise<User> {
    return this.model.save({ name, surname });
  }

  public async finAll(): Promise<User[]> {
    return this.model.find();
  }
}
