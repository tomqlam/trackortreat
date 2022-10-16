import './pre-start'; // Must be the first import
import morgan from 'morgan';
import cors from "cors";
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import BaseRouter from './routes/api';
// import EnvVars from 'src/configurations/EnvVars';

import { NodeEnvs } from 'src/declarations/enums';


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
// if (EnvVars.nodeEnv === NodeEnvs.Dev) {
//   console.log("Running on Dev")
//   app.use(morgan('dev'));
// }

// // Security
// if (EnvVars.nodeEnv === NodeEnvs.Production) {
//   console.log("Running on Prod")
//   app.use(helmet());
// }
// **** Add API routes **** //

export default app;

