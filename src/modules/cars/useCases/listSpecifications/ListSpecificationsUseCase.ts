import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/implementations/ISpecificationsRepository';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  async execute(): Promise<Specification[]> {
    const categories = await this.specificationsRepository.list();

    return categories;
  }
}

export { ListSpecificationsUseCase };
