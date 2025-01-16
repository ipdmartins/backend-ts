import { Router } from "express";
import PassResetController from "../../controllers/PassResetController";

const passResetRouter = Router();

const passResetController = new PassResetController();

passResetRouter.post("/", passResetController.resetPass);

export default passResetRouter;
