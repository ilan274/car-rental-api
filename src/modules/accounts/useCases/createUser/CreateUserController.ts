import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { name, username, password, email, driver_licence } = request.body;

    const createdUser = await createUserUseCase.execute({
      name,
      username,
      password,
      email,
      driver_licence,
    });

    return response.status(201).json(createdUser);
  }
}

export { CreateUserController };
