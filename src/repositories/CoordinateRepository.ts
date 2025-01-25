import { injectable } from "inversify";
import { Repository } from "typeorm";
import { ICoordinateRepository } from "./IRepositories/ICoordinateRepository";
import { getDataSource } from "../infra/AppDataSource";
import { Coordinate } from "../entities/coordinate";

@injectable()
export class CoordinateRepository implements ICoordinateRepository {
  private ormRepo: Repository<Coordinate> | null = null;

  private async getOrmRepo(): Promise<Repository<Coordinate>> {
    if (!this.ormRepo) {
      const dataSource = await getDataSource();
      this.ormRepo = dataSource.getRepository(Coordinate);
    }
    return this.ormRepo;
  }

  async create(data: Coordinate): Promise<void> {
    const repo = await this.getOrmRepo();
    await repo.save(data);
  }

  async listAll(): Promise<Coordinate[]> {
    const repo = await this.getOrmRepo();
    return repo.find();
  }
}
