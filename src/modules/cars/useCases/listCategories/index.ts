import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export default (): ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

  const listCategoryController = new ListCategoriesController(
    listCategoriesUseCase
  );
  return listCategoryController;
};
