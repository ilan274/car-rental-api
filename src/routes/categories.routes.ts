import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (_request, response) => {
  const allCategories = categoriesRepository.list();

  return response.status(201).json(allCategories);
});

export { categoriesRoutes };
