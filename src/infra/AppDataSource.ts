import { DataSource } from "typeorm";
import { CoordinateSchema } from "./db/typeorm/coordinate.schema";
import { UserSchema } from "./db/typeorm/user.schema";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // From .env file
  password: "postgres", // From .env file
  database: "test_db_pg", // From .env file
  synchronize: true,
  logging: false,
  entities: [CoordinateSchema, UserSchema],
});

export const getDataSource = async (): Promise<DataSource> => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Database connected successfully.");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }
  return AppDataSource;
};
