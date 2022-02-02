const Pool = require("pg").Pool;

const pool = new Pool({
  user: "spenvest",
  password: "password",
  host: "127.0.0.1",
  port: "5432",
  database: "spenvest",
});

module.exports = pool;
