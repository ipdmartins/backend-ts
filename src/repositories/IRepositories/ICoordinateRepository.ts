import { Coordinate } from "../../entities/coordinate";

export interface ICoordinateRepository {
  create(data: Coordinate): Promise<void>;
  listAll(): Promise<Coordinate[]>;
}
