import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/implementations/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({
    name,
    description,
  }: IRequest): Promise<Specification | undefined> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists.', 409);
    }

    await this.specificationRepository.create({ name, description });
    return this.specificationRepository.findByName(name);
  }
}

export { CreateSpecificationUseCase };
