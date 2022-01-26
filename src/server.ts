import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import { AppError } from './errors/AppError';
import { router } from './routes';
import swaggerFile from './swagger.json';

import './database';
import './shared/container';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error`,
    });
  }
);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
