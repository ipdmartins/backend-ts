import { Router } from "express";
import CoordinateController from "../../controllers/CoordinateController";
import { AppDataSource } from "../AppDataSource";
import { Coordinate } from "../../entities/coordinate";
import { CoordinateRepository } from "../../repositories/CoordianteRepository";

const coordinateRouter = Router();

AppDataSource.initialize()
  .then(() => {
    const ormRepository = AppDataSource.getRepository(Coordinate);
    const coordinateRepository = new CoordinateRepository(ormRepository);
    const coordinateController = new CoordinateController(coordinateRepository);

    coordinateRouter.post("/", coordinateController.create);
    coordinateRouter.get("/", coordinateController.list);
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });

export default coordinateRouter;
