import "reflect-metadata";
import { ContainerModule, interfaces } from "inversify";
import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";
import { CoordinateRepository } from "../repositories/CoordinateRepository";
import { IUserRepository } from "../repositories/IRepositories/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";

const repoContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICoordinateRepository>("ICoordinateRepository").to(CoordinateRepository);
  bind<IUserRepository>("IUserRepository").to(UserRepository);
});

export default repoContainer;
