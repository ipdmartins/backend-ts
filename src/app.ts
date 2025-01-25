import express, { Application, json } from "express";
import cors from "cors";
import routes from "./infra/routes";

const app: Application = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(json());
app.use(routes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
