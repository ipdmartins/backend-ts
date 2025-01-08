import { Router } from "express";
import CoordinateController from "../controllers/CoordinateController";

const coordinateRouter = Router();

const coordinateController = new CoordinateController();

coordinateRouter.post("/", coordinateController.create);
coordinateRouter.get("/", coordinateController.list);

export default coordinateRouter;
