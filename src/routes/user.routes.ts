import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.get("/", userController.listAll);

export default userRouter;
