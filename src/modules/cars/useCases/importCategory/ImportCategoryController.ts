import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  handle(request: Request, response: Response): Response {
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    const { file } = request;

    if (!file) {
      return response.status(422).json({ error: 'File is required' });
    }

    importCategoryUseCase.execute(file);

    return response.status(201).json();
  }
}

export { ImportCategoryController };
