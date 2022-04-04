import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it('should create a new user and receive token', async () => {
    const user: ICreateUserDTO = {
      name: 'Ilan Herbach',
      email: 'ilan.herbach@gmail.com',
      password: '123456',
      driver_licence: '123123',
    };

    await createUserUseCase.execute(user);

    const authenticateUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticateUser).toHaveProperty('user');
    expect(authenticateUser).toHaveProperty('user.name');
    expect(authenticateUser).toHaveProperty('user.email');
    expect(authenticateUser).toHaveProperty('token');
  });

  it('should not be able to authenticate non existant user', () => {
    expect(async () => {
      const fakeUser: ICreateUserDTO = {
        name: 'Not Real',
        email: 'non-existant@gmail.com',
        password: 'lets_check@123',
        driver_licence: '000000',
      };

      await authenticateUserUseCase.execute({
        email: fakeUser.email,
        password: fakeUser.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Ilan Herbach',
        email: 'ilan.herbach@gmail.com',
        password: '123456',
        driver_licence: '123123',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'thisIsNotMyPass',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
