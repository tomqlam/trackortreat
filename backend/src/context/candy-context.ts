import { ICandy } from '@models/Candy';
import { getRandomInt } from 'src/declarations/functions';
import pg from 'pg';

// **** Functions **** //


const { Pool, Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);
// async arrow function

const getCandies = async (): Promise<ICandy[]> => {
  // connect using postgresql
  await client.connect();
  const res = await client.query('SELECT * FROM candies');
  console.log(res.rows);
  return res;
}

// **** Export default **** //

export default {
  getCandies,
} as const;
