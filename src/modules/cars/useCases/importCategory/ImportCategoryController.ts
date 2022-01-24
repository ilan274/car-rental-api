import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
 async handle(request: Request, response: Response): Promise<Response> {
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    const { file } = request;

    if (!file) {
      return response.status(422).json({ error: 'File is required' });
    }

    await importCategoryUseCase.execute(file);

    return response.status(201).json();
  }
}

export { ImportCategoryController };
