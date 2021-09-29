import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(_request: Request, response: Response): Response {
    const allCategories = this.listCategoriesUseCase.execute();

    return response.status(201).json(allCategories);
  }
}

export { ListCategoriesController };
