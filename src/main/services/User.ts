import { DatabaseManger } from '@/utils';
import { UserModel } from '@/models';

export class UserService extends DatabaseManger {
  constructor() {
    super([UserModel]);
  }

  /**
   * 创建对象
   * @param name
   * @param surname
   */
  public async insert(name: string, surname: string): Promise<UserModel> {
    const patientRepository = this.connection.getRepository(UserModel);
    const user: UserModel = { name, surname };

    return patientRepository.save(user);
  }

  public async fetchAll(): Promise<UserModel[]> {
    const patientRepository = this.connection.getRepository(UserModel);

    return patientRepository.find();
  }
}
