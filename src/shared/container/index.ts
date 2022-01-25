import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/implementations/ICategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/implementations/ISpecificationsRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/SpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
