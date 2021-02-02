import { DatabaseManger } from '@/utils';
import { UserModel } from '@/models';

export class UserService extends DatabaseManger {
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
