import { Request, Response } from 'express';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}
  handle(_request: Request, response: Response): Response {
    const allSpecifications = this.listSpecificationsUseCase.execute();
    return response.status(201).json(allSpecifications);
  }
}

export { ListSpecificationsController };
