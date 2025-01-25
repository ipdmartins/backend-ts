import { Repository } from "typeorm";
import { IUserRepository } from "./IRepositories/IUserRepository";
import { getDataSource } from "../infra/AppDataSource";
import { User } from "../entities/user";

export default class UserRepository implements IUserRepository {
  private static instance: UserRepository;
  private ormRepo: Repository<User>;

  private constructor() {
    getDataSource().then((dataSource) => {
      this.ormRepo = dataSource.getRepository(User);
    });
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
      UserRepository.instance;
    }

    return UserRepository.instance;
  }

  // private async getRepo() {
  //   if (!this.ormRepo) {
  //     const con = await getDataSource();
  //     this.ormRepo = con.getRepository(User);
  //   }
  // }

  private ensureRepoReady() {
    if (!this.ormRepo) {
      throw new Error(
        "Repository is not ready yet. Ensure DataSource is initialized."
      );
    }
  }

  public async create(user: User): Promise<void> {
    await this.ensureRepoReady();
    await this.ormRepo!.save(user);
  }

  public async findByEmail(email: String): Promise<User | null> {
    await this.ensureRepoReady();
    return this.ormRepo!.findOneBy({ email });
  }

  public async listAll(): Promise<User[]> {
    await this.ensureRepoReady();
    return this.ormRepo!.find();
  }
}
