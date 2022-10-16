import { ICandy } from '@models/Candy';
// **** Functions **** //


const { Pool, Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);
client.connect();

const getCandies = async (): Promise<ICandy[]> => {
  // connect using postgresql
  const res = await client.query('SELECT * FROM candies');
  return res.rows;
}

// **** Export default **** //

export default {
  getCandies,
} as const;
