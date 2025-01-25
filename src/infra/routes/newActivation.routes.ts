import { Router } from "express";
import { IUserRepository } from "../../repositories/IRepositories/IUserRepository";
import NewActivationController from "../../controllers/NewActivationController";
import appContainer from "../../providers";

const newActivationRouter = Router();

const userRepository = appContainer.get<IUserRepository>("IUserRepository");

const newActivationController = new NewActivationController(userRepository);

newActivationRouter.post("/", newActivationController.sendActivation);

export default newActivationRouter;
