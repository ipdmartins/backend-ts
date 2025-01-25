import { ContainerModule, interfaces } from "inversify";
import { ICoordinateController } from "../controllers/IControllers/ICoordinateController";
import CoordinateController from "../controllers/CoordinateController";

const controllerContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICoordinateController>("ICoordinateController").to(CoordinateController);
});

export default controllerContainer;
