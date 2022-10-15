import StatusCodes from 'http-status-codes';

import authService from '@services/auth-service';
import EnvVars from 'src/configurations/EnvVars';
import { IReq, IRes } from 'src/declarations/types';


// **** Types **** //

interface ILoginReq {
  email: string;
  password: string;
}


// **** Variables **** //

// Status codes
const { OK } = StatusCodes;

// Paths
const paths = {
  basePath: '/auth',
  login: '/login',
  logout: '/logout',
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function login(req: IReq<ILoginReq>, res: IRes) {
  const { email, password } = req.body;
  // Add jwt to cookie
  const jwt = await authService.getJwt(email, password);
  const { key, options } = EnvVars.cookieProps;
  res.cookie(key, jwt, options);
  // Return
  return res.status(OK).end();
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  const { key, options } = EnvVars.cookieProps;
  res.clearCookie(key, options);
  return res.status(OK).end();
}


// **** Export default **** //

export default {
  paths,
  login,
  logout,
} as const;
