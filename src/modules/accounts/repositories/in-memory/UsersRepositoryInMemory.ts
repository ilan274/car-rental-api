import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  Users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, data);

    this.Users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.Users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.Users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
