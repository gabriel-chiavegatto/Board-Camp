import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
  user : 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'boardcamp'
});

export {connection}


// const connection = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });