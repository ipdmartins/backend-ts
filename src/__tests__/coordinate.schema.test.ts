import { DataSource } from "typeorm";
import { CoordinateSchema } from "../db/typeorm/coordinate.schema";
import { Coordinate } from "../entities/coordinate";

describe("testing coordinate schema", () => {
  test("create", async () => {
    const dataSource = new DataSource({
      type: "postgres",
      database: ":memory:",
      synchronize: true,
      logging: true,
      entities: [CoordinateSchema],
    });

    await dataSource.initialize();

    const coord = Coordinate.create({
      title: "my coord",
      startPosition: { lat: 1, lng: 2 },
      endPosition: { lat: 2, lng: 4 },
      points: [{ lat: 3, lng: 4 }],
    });

    const routeRepo = dataSource.getRepository(Coordinate);
    await routeRepo.save(coord);
  });
});
