import { inject, injectable } from 'tsyringe';

import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    name,
    description,
  }: IRequest): Promise<Category | undefined> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error('Category already exists.');
    }

    const createdCategory = await this.categoriesRepository.create({
      name,
      description,
    });

    return createdCategory;
  }
}

export { CreateCategoryUseCase };
