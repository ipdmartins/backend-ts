import "reflect-metadata";
import { Router } from "express";
import newActivationRouter from "./newActivation.routes";
import coordinateRouter from "./coordinate.routes";
import passResetRouter from "./passReset.routes";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/coordinate", coordinateRouter);
routes.use("/auth", authRouter);
routes.use("/passReset", passResetRouter);
routes.use("/activateAccount", newActivationRouter);

export default routes;
