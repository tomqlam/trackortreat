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

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  return Math.pow(lat2-lat1,2) + Math.pow(lon2-lon1,2);
}

const getOptimalPath = async (filter: IFilter): Promise<IHouseWithId[]> => {
  const validHouses:IHouseWithId[] = await getFilteredHouses(filter);
  let curLat = filter.userlatitude;
  let curLong = filter.userlongitude;
  let optimalPath: IHouseWithId[] = [];
  const visited = {};
  for(let i = 0; i < validHouses.length; i++) {
    let minDistance = Number.MAX_VALUE;
    let minIndex = -1;
    for(let j = 0; j < validHouses.length; j++) {
      if((visited as any)[j]) continue;
      const curDistance = getDistance(curLat, curLong, validHouses[j].latitude, validHouses[j].longitude);
      if(curDistance < minDistance) {
        minDistance = curDistance;
        minIndex = j;
      }
    }
    (visited as any)[minIndex] = true;
    curLat = validHouses[minIndex].latitude;
    curLong = validHouses[minIndex].longitude;
    optimalPath.push(validHouses[minIndex]);
  }
  return optimalPath;
}

const createHouse = async (house: IHouse): Promise<boolean> => {
  return houseContext.createHouse(house);
}
// **** Export default **** //

export default { 
  getHouses,
  getFilteredHouses,
  createHouse,
  getOptimalPath,
} as const;
