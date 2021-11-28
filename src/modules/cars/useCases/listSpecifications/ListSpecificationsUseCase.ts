import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../../repositories/implementations/ISpecificationsRepository';

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    const categories = this.specificationsRepository.list();

    return categories;
  }
}

export { ListSpecificationsUseCase };
