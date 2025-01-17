import express, { Application, json } from "express";
import cors from "cors";
import newActivationRouter from "./infra/routes/newActivation.routes";
import coordinateRouter from "./infra/routes/coordinate.routes";
import passResetRouter from "./infra/routes/passReset.routes";
import userRouter from "./infra/routes/user.routes";
import authRouter from "./infra/routes/auth.routes";

const app: Application = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(json());

app.use("/coordinate", coordinateRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/passReset", passResetRouter);
app.use("/activateAccount", newActivationRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
