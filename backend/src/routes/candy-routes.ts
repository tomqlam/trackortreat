import { ICandy } from '@models/Candy';
import candyService from '@services/candy-service';
import StatusCodes from 'http-status-codes';

// **** Variables **** //

// Misc
const { CREATED, OK } = StatusCodes;

// Paths
const path:string = '/candy' as const;
// async arrow function that returns promise of string

const getCandies = async (): Promise<ICandy[] | undefined> => {
  try {
    const candies = await candyService.getCandies();
    return candies;
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}


// **** Export default **** //

export default {
  path,
  getCandies,
} as const;
