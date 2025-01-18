import { DataSource } from "typeorm";
import { CoordinateRepository } from "../repositories/CoordianteRepository";
import { CoordinateSchema } from "../infra/db/typeorm/coordinate.schema";
import { Coordinate } from "../entities/coordinate";
import dotenv from "dotenv";
dotenv.config();

describe("testing coordinate schema", () => {
  if (process.env.CI_ENV) {
    let dataSource = null as any;
    beforeAll(async () => {
      if (process.env.CI_ENV) {
        dataSource = new DataSource({
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          synchronize: true,
          logging: false,
          entities: [CoordinateSchema],
        });

        await dataSource.initialize();
      }
    });

    test("create", async () => {
      const coord = await Coordinate.create({
        title: "my coord",
        startPosition: { lat: 1, lng: 2 },
        endPosition: { lat: 2, lng: 4 },
        points: [{ lat: 3, lng: 4 }],
      });

      const ormRepo = dataSource.getRepository(Coordinate);
      const coordRepo = new CoordinateRepository(ormRepo);
      await coordRepo.create(coord);

      const foundCoord = await ormRepo.findOneBy({
        coordinate_id: coord.coordinate_id,
      });
      expect(foundCoord.toJSON()).toStrictEqual(coord.toJSON());
    });
  } else {
    test.skip("should skip the test", () => {
      expect(1).toBe(true);
    });
  }
});
