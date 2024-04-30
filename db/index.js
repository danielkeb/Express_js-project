const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;