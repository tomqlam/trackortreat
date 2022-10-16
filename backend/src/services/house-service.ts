import houseContext from '@context/house-context';
import { IFilter } from '@models/Filter';
import { IHouse, IHouseWithId } from '@models/House';


const getHouses = async (): Promise<IHouseWithId[]> => {
  return houseContext.getHouses();
}

const getFilteredHouses = async (filter: IFilter): Promise<IHouseWithId[]> => {
  const localHouses: IHouseWithId[] = await houseContext.getFilteredHouses(filter);
  let validHouseID = {};
  for(let i = 0; i < localHouses.length; i++) {
    const currentHouse = localHouses[i];
    for(let key in filter['candyprefs']) {
      if((filter['candyprefs'] as any)[key] && (currentHouse.candyflags as any)[key]) {
        console.log(key);
        (validHouseID as any)[currentHouse.houseid] = true;
        continue;
      }
    }
  }
  let validHouses: IHouseWithId[] = [];
  for(let key in validHouseID) {
    validHouses.push(localHouses.find(house => String(house.houseid) === key) as IHouseWithId);
  }
  return validHouses;
}

const createHouse = async (house: IHouse): Promise<boolean> => {
  return houseContext.createHouse(house);
}
// **** Export default **** //

export default {
  getHouses,
  getFilteredHouses,
  createHouse,
} as const;
