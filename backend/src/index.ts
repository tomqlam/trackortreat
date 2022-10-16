import './pre-start'; // Must be the first import
import candyService from '@services/candy-service';
import morgan from 'morgan';
import cors from "cors";
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import BaseRouter from './routes/api';
import logger from 'jet-logger';
import EnvVars from 'src/configurations/EnvVars';
import { CustomError } from 'src/declarations/errors';

import { NodeEnvs } from 'src/declarations/enums';

import pg from 'pg';
import { ICandy } from '@models/Candy';

// **** Functions **** //


// const { Pool, Client } = require('pg');

// const client = new Client(process.env.DATABASE_URL);
// // async arrow function

// const getCandies = async (): Promise<ICandy[]> => {
//   // connect using postgresql
//   await client.connect();
//   const res = await client.query('SELECT * FROM candies');
//   console.log(res.rows);
//   return res;
// }

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

// **** Init express **** //

const app = express();


// **** Set basic express settings **** //
app.use(helmet());
app.use(cors());
app.use(express.json());

// Add APIs

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// app.get('/api', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

app.use('/api', BaseRouter);
// app.use('/api', async (req: Request, res: Response, next: NextFunction) => { Bas(req, res, next); });


app.get('/api', (req: Request, res: Response) => {
  res.send('Welcome to the API!');
  // getCandies();
});
// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}
// **** Add API routes **** //

export default app;

