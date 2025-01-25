import { Router } from "express";
import { IUserRepository } from "../../repositories/IRepositories/IUserRepository";
import AuthController from "../../controllers/AuthController";
import appContainer from "../../providers";

const authRouter = Router();

const userRepository = appContainer.get<IUserRepository>("IUserRepository");

const authController = new AuthController(userRepository);

authRouter.post("/", authController.authenticate);

export default authRouter;
