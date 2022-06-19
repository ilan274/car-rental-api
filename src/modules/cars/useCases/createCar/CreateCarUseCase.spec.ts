import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      brand: 'brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      licence_plate: 'ABC-1234',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existing licence plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car Name1',
        brand: 'brand',
        category_id: 'category',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        licence_plate: 'ABC-1234',
      });

      await createCarUseCase.execute({
        name: 'Car Name2',
        brand: 'brand',
        category_id: 'category',
        daily_rate: 100,
        description: 'Description Car',
        fine_amount: 60,
        licence_plate: 'ABC-1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Available car',
      brand: 'brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'Description Car',
      fine_amount: 60,
      licence_plate: 'ABC-1234',
    });

    expect(car.available).toBe(true);
  });
});
