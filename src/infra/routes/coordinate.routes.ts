import { Router } from "express";
import { ICoordinateRepository } from "../../repositories/IRepositories/ICoordinateRepository";
import CoordinateController from "../../controllers/CoordinateController";
import appContainer from "../../providers";

const coordinateRouter = Router();

const coordinateRepository = appContainer.get<ICoordinateRepository>(
  "ICoordinateRepository"
);

const coordinateController = new CoordinateController(coordinateRepository);

coordinateRouter.post("/", coordinateController.create);
coordinateRouter.get("/", coordinateController.listAll);

export default coordinateRouter;
