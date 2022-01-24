import { inject, injectable } from 'tsyringe';

import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/implementations/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const categories = await this.specificationsRepository.list();

    return categories;
  }
}

export { ListSpecificationsUseCase };
