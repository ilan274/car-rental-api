import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private listCategoriesUseCase: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.listCategoriesUseCase.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
