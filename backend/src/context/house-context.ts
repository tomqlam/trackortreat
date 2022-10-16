import { IFilter } from '@models/Filter';
import { IHouseWithId, IHouse } from '@models/House';
// **** Functions **** //

const { Pool, Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);
client.connect();

const getHouses = async (): Promise<IHouseWithId[]> => {
  // connect using postgresql
  const res = await client.query('SELECT * FROM houses');
  console.log(res.rows);
  return res.rows;
}

const getFilteredHouses = async (filter: IFilter): Promise<IHouseWithId[]> => {
  // connect using postgresql
  
  let queryString = `SELECT * FROM houses
                    WHERE (
                      3959 * acos (
                      cos ( radians(${filter.userlatitude}) )
                      * cos( radians( CAST(houses.latitude as FLOAT)) )
                      * cos( radians( CAST(houses.longitude as FLOAT)) - radians(${filter.userlongitude}) )
                      + sin( radians(${filter.userlatitude}) )
                      * sin( radians( CAST(houses.latitude as FLOAT)) )
                    ) < ${filter.radius});`;
  console.log(queryString);

  const res = await client.query(queryString);
  // console.log(res.rows);
  return res.rows;
}

const createHouse = async (house: IHouse): Promise<boolean> => {
  // connect using postgresql
  // pool.query('SELECT * FROM table where username=$1 and password=$2', [username, password], (error, results) => {

  let queryString = `INSERT INTO houses (houseaddress, latitude, longitude, candyflags, hascandy, haslargecandy, openbowl) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  try {
    await client.query(queryString, [house.houseaddress, house.latitude, house.longitude, house.candyflags, house.hascandy, house.haslargecandy, house.openbowl]);
    return true;
  } catch (e) {
    console.log(JSON.stringify(e));
    return false;
  }
}
// **** Export default **** //

export default {
  getHouses,
  getFilteredHouses,
  createHouse,
} as const;
