import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // For Errors inside the application
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  // Errors outside the application
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})