import candyRoutes from './candy-routes';
import houseRoutes from './house-routes';
import express, { Router, Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
// **** Init **** //

const apiRouter = Router();

const candyRouter = Router();
const houseRouter = Router();

candyRouter.use(async (req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now());
  next();
});

candyRouter.get('/', async (req: Request, res: Response) => {
  res.send(await candyRoutes.getCandies());
});

houseRouter.get('/', async (req: Request, res: Response) => {
  res.send(await houseRoutes.getHouses());
});

houseRouter.post('/filter', async (req: Request, res: Response) => {
  res.send(await houseRoutes.getFilteredHouses(req.body));
});

houseRouter.get('/', async (req: Request, res: Response) => {
  res.send(await houseRoutes.getHouses());
});

houseRouter.post('/', async (req: Request, res: Response) => {
  //sanitize request
  res.send(await houseRoutes.createHouse(req.body) ? 'Adding House was Successful!' : 'Failed to Add House');
});

apiRouter.use('/candy', candyRouter);
apiRouter.use('/house', houseRouter);


// async express router use
// apiRouter.use('/candy', async (req: Request, res: Response, next: NextFunction) => { candyRouter(req, res, next); });


// **** Export default **** //

export default apiRouter;
