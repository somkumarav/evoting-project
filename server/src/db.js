const pg = require('pg');

const pool = new pg.Pool({
  user: 's0m',
  password: '',
  host: 'localhost',
  database: 'project',
  port: 5432,
});

module.exports = pool;
