import { DataSource } from "typeorm";
import config from "config";

export default new DataSource({
  type: "postgres",
  username: config.get<string>("PG_USER"),
  host: config.get<string>("PG_HOST"),
  database: config.get<string>("PG_DATABASE"),
  port: config.get<number>("PG_PORT"),
  password: config.get<string>("PG_PASSWORD"),
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
});
