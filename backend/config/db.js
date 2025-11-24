// backend/config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pass',         // same as POSTGRES_PASSWORD
  port: 5432,
});

module.exports = pool;
