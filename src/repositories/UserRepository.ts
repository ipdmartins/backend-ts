import { Repository } from "typeorm";
import { injectable } from "inversify";
import { IUserRepository } from "./IRepositories/IUserRepository";
import { getDataSource } from "../infra/AppDataSource";
import { User } from "../entities/user";

@injectable()
export class UserRepository implements IUserRepository {
  private ormRepo: Repository<User> | null = null;

  private async getRepo(): Promise<Repository<User>> {
    if (!this.ormRepo) {
      const con = await getDataSource();
      this.ormRepo = con.getRepository(User);
    }
    return this.ormRepo;
  }

  public async create(user: User): Promise<void> {
    const repo = await this.getRepo();
    await repo!.save(user);
  }

  public async findByEmail(email: String): Promise<User | null> {
    const repo = await this.getRepo();
    return repo!.findOneBy({ email });
  }

  public async listAll(): Promise<User[]> {
    const repo = await this.getRepo();
    return repo!.find();
  }
}
