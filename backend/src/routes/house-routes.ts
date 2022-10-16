import { ICandy } from '@models/Candy';
import { IHouseWithId } from '@models/House';
import houseService from '@services/house-service';
import StatusCodes from 'http-status-codes';

// **** Variables **** //

// Misc
const { CREATED, OK } = StatusCodes;

// Paths
const path:string = '/candy' as const;
// async arrow function that returns promise of string

const getHouses = async (): Promise<IHouseWithId[] | undefined> => {
  try {
    const houses = await houseService.getHouses();
    return houses;
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}


// **** Export default **** //

export default {
  path,
  getHouses,
} as const;
