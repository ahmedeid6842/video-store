import { Pool } from "pg";
import config from "config";

const pool = new Pool({
  user: config.get<string>("PG_USER"),
  host: config.get<string>("PG_HOST"),
  database: config.get<string>("PG_DATABASE"),
  port: config.get<number>("PG_PORT"),
  password: config.get<string>("PG_PASSWORD"),
});

export default pool;
