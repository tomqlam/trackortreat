import { Router } from 'express';

import candyRoutes from './candy-routes';


// **** Init **** //

const apiRouter = Router();

const candyRouter = Router();

candyRouter.get(candyRoutes.paths.basePath);

// **** Export default **** //

export default apiRouter;
