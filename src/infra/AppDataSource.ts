import { DataSource } from "typeorm";
import { CoordinateSchema } from "./db/typeorm/coordinate.schema";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // From .env file
  password: "postgres", // From .env file
  database: "test_db_pg", // From .env file
  synchronize: true,
  logging: false,
  entities: [CoordinateSchema],
});
