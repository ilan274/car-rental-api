import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(_request: Request, response: Response): Promise<Response> {
    const allCategories = await this.listCategoriesUseCase.execute();

    return response.status(201).json(allCategories);
  }
}

export { ListCategoriesController };
