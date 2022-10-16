import { IHouseWithId, IHouse } from '@models/House';
// **** Functions **** //

const { Pool, Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);
client.connect();

const getHouses = async (): Promise<IHouseWithId[]> => {
  // connect using postgresql
  const res = await client.query('SELECT * FROM houses');
  // const res = await getDummyCandies();
  console.log(res.rows);
  return res.rows;
}

// **** Export default **** //

export default {
  getHouses,
} as const;
