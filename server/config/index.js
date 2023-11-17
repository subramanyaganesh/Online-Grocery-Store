require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const database =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_DB_TEST
    : process.env.POSTGRES_DB;

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;
const pool = new Pool({
  connectionString
});


module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};

async function checkConnectionStatus() {
  let client;
  try {
    client = await pool.connect();
    console.log('Connection to PostgreSQL is successful');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
}

console.log('Checking connection to PostgreSQL...',checkConnectionStatus());