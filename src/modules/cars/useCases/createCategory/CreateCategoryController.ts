import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    const { name, description } = request.body;

    try {
      const createdCategory = await createCategoryUseCase.execute({
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
