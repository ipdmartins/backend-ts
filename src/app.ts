import express, { Application, json } from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import passResetRouter from "./routes/passReset.routes";
import newActivationRouter from "./routes/newActivation.routes";
import coordinateRouter from "./routes/coordinate.routes";

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
