import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';
import { ICarsRepository } from './ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    licence_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      licence_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicencePlate(licence_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ licence_plate });
    return car;
  }
}

export { CarsRepository };
