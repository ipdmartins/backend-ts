import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import { IUserRepository } from "../../repositories/IRepositories/IUserRepository";
import UserController from "../../controllers/UserController";
import appContainer from "../../providers";

const userRepository = appContainer.get<IUserRepository>("IUserRepository");

const userRouter = Router();

const userController = new UserController(userRepository);

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      givenName: Joi.string().required(),
      familyName: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

userRouter.get("/", userController.listAll);

export default userRouter;
