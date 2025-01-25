import { Router } from "express";
import { IUserRepository } from "../../repositories/IRepositories/IUserRepository";
import PassResetController from "../../controllers/PassResetController";
import appContainer from "../../providers";

const passResetRouter = Router();

const userRepository = appContainer.get<IUserRepository>("IUserRepository");

const passResetController = new PassResetController(userRepository);

passResetRouter.post("/", passResetController.resetPass);

export default passResetRouter;
