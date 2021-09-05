import { User } from '@/models';

import { event, ServiceModule } from '@/services/index';

export default class UserService extends ServiceModule {
  get model() {
    return this.app.database.getRepository(User)!;
  }

  /**
   * 创建对象
   * @param name
   * @param surname
   */
  @event('/user/add')
  async insert(name: string, surname: string): Promise<User> {
    return this.model.save({ name, surname });
  }

  /**
   * 查找所有
   */
  @event('/user/find-all')
  async finAll(): Promise<User[]> {
    return this.model.find();
  }
}
