import express, { Application, json } from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";

const app: Application = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(json());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
