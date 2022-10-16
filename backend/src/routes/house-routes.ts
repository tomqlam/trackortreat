import { ICandy } from '@models/Candy';
import { IFilter } from '@models/Filter';
import { IHouse, IHouseWithId } from '@models/House';
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

const getFilteredHouses = async (filter: IFilter): Promise<IHouseWithId[] | undefined> => {
  try {
    const houses = await houseService.getFilteredHouses(filter);
    return houses;
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}

const getOptimalPath = async (filter: IFilter): Promise<IHouseWithId[] | undefined> => {
  try {
    const houses = await houseService.getOptimalPath(filter);
    return houses;
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}

const createHouse = async (house: IHouse): Promise<boolean> => {
  try {
    const result = await houseService.createHouse(house);
    return result;
  } catch (e) {
    console.log(JSON.stringify(e));
    return false;
  }
}

// **** Export default **** //

export default {
  path,
  getHouses,
  getFilteredHouses,
  createHouse,
  getOptimalPath,
} as const;
