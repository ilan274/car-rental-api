import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const { name, password, email, driver_licence } = request.body;

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_licence,
    });

    return response
      .status(201)
      .json({ status: 201, message: 'User created successfully.' });
  }
}

export { CreateUserController };
