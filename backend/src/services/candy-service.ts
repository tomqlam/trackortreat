import candyContext from '@context/candy-context';
import { ICandy } from '@models/Candy';


const getCandies = async (): Promise<ICandy[]> => {
  return candyContext.getCandies();
}
// **** Export default **** //

export default {
  getCandies,
} as const;
