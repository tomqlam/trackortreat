import candyRoutes from './candy-routes';
import express, { Router, Request, Response, NextFunction } from 'express';


// **** Init **** //

const apiRouter = Router();

const candyRouter = Router();

candyRouter.use(async (req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now());
  next();
});

candyRouter.get('/', async (req: Request, res: Response) => {
  res.send(await candyRoutes.getCandies());
});

apiRouter.use('/candy', candyRouter);


// async express router use
// apiRouter.use('/candy', async (req: Request, res: Response, next: NextFunction) => { candyRouter(req, res, next); });


// **** Export default **** //

export default apiRouter;
