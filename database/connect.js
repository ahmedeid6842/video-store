const Pool = require("pg").Pool;
const config = require('config');

const pool = new Pool({
    user: config.get("PG_USER"),
    host: config.get("PG_HOST"),
    database: config.get("PG_DATABASE"),
    port: config.get("PG_PORT"),
    password: config.get("PG_PASSWORD")
})

module.exports = pool;