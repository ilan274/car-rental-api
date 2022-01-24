import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    const allSpecifications = await listSpecificationsUseCase.execute();
    return response.status(201).json(allSpecifications);
  }
}

export { ListSpecificationsController };
