import { DataSource } from "typeorm";
import { CoordinateSchema } from "../infra/db/typeorm/coordinate.schema";
import { Coordinate } from "../entities/coordinate";
import dotenv from "dotenv";

describe("testing coordinate schema", () => {
  let dataSource = null as any;
  beforeAll(async () => {
    dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      logging: true,
      entities: [CoordinateSchema],
    });
    // dataSource = new DataSource({
    //   type: "postgres",
    //   host: "localhost",
    //   port: 5432,
    //   username: "postgres", // From .env file
    //   password: "postgres", // From .env file
    //   database: "test_db_pg", // From .env file
    //   synchronize: true,
    //   logging: true,
    //   entities: [CoordinateSchema],
    // });

    await dataSource.initialize();
  });

  test("create", async () => {
    const coord = await Coordinate.create({
      title: "my coord",
      startPosition: { lat: 1, lng: 2 },
      endPosition: { lat: 2, lng: 4 },
      points: [{ lat: 3, lng: 4 }],
    });

    const routeRepo = dataSource.getRepository(Coordinate);
    await routeRepo.save(coord);
  });
});
