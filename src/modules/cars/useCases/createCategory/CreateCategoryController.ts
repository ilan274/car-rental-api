import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): void {
    const { name, description } = request.body;

    this.createCategoryUseCase.execute({ name, description });
  }
}

export { CreateCategoryController };
