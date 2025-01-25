import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import UserController from "../../controllers/UserController";

const userRouter = Router();

const userController = UserController.getInstance();

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
