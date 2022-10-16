import { ICandy } from '@models/Candy';
// **** Functions **** //


const { Pool, Client } = require('pg');

const client = new Client(process.env.DATABASE_URL);
client.connect();

// dummy function that returns 10 after a 1 second timeout
const getDummyCandies = async (): Promise<ICandy[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
}

const getCandies = async (): Promise<ICandy[]> => {
  // connect using postgresql
  const res = await client.query('SELECT * FROM candies');
  // const res = await getDummyCandies();
  console.log(res.rows);
  return res.rows;
}

// **** Export default **** //

export default {
  getCandies,
} as const;
