import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => {
  createSpecificationController.handle(request, response);
});

specificationsRoutes.get('/', (request, response) => {
  return listSpecificationsController.handle(request, response);
});

export { specificationsRoutes };
