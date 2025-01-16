import { Repository } from "typeorm";
import { Coordinate } from "../entities/coordinate";
import { ICoordinateRepository } from "./IRepositories/ICoordinateRepository";

export class CoordinateRepository implements ICoordinateRepository {
  constructor(private ormRepo: Repository<Coordinate>) {}

  async create(data: Coordinate): Promise<void> {
    await this.ormRepo.save(data);
  }

  listAll(): Promise<Coordinate[]> {
    return this.ormRepo.find();
  }
}
