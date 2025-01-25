import "reflect-metadata";
import { ContainerModule, interfaces } from "inversify";
import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";
import { CoordinateRepository } from "../repositories/CoordianteRepository";

const repoContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICoordinateRepository>("ICoordinateRepository").to(CoordinateRepository);
});

export default repoContainer;
