import houseContext from 'src/context/house-context';
import { IHouse, IHouseWithId } from '@models/House';


const getHouses = async (): Promise<IHouseWithId[]> => {
  return houseContext.getHouses();
}
// **** Export default **** //

export default {
  getHouses,
} as const;
