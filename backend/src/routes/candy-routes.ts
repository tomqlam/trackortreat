import candyService from '@services/candy-service';
import StatusCodes from 'http-status-codes';
// **** Variables **** //

// Misc
const { CREATED, OK } = StatusCodes;

// Paths
const paths = {
  basePath: '/candy',
} as const;

const getCandies = async () => {
  try {
    const candies = await candyService.getCandies();
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}


// **** Export default **** //

export default {
  paths,
  getCandies,
} as const;
