import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    try {
      const createdCategory = this.createCategoryUseCase.execute({
        name,
        description,
      });
      return response.status(201).json(createdCategory);
    } catch (error) {
      const errorMessage = (error as Error).message;
      return response.status(400).json({ error: errorMessage });
    }

    return response.status(201).json();
  }
}

export { CreateCategoryController };
