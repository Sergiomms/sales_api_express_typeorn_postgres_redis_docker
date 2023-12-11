import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '../errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

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