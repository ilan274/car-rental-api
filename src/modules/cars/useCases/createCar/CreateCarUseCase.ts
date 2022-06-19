// import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  licence_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRepositories')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    licence_plate,
    name,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicencePlate(
      licence_plate
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists', 409);
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      licence_plate,
      name,
    });

    return car;
  }
}

export { CreateCarUseCase };
