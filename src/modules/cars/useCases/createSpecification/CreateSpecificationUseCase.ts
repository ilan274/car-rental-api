import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../../repositories/implementations/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): Specification | undefined {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists.');
    }

    this.specificationRepository.create({ name, description });
    return this.specificationRepository.findByName(name);
  }
}

export { CreateSpecificationUseCase };
