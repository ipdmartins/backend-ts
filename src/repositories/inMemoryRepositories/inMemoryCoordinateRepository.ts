import { ICoordinateRepository } from "../IRepositories/ICoordinateRepository";
import { Coordinate } from "../../entities/coordinate";

export class InMemoryCoordinateRepository implements ICoordinateRepository {
  items: Coordinate[] = [];

  async create(data: Coordinate): Promise<void> {
    this.items.push(data);
  }

  async listAll(): Promise<Coordinate[]> {
    return this.items;
  }
}
