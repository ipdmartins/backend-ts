import { Router } from "express";
import NewActivationController from "../controllers/NewActivationController";

const newActivationRouter = Router();

const newActivationController = new NewActivationController();

newActivationRouter.post("/", newActivationController.sendActivation);

export default newActivationRouter;
