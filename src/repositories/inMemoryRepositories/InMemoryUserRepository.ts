import { IUserRepository } from "../IRepositories/IUserRepository";
import { ErrorHandler } from "./errorHandler/errorHandler";
import { User } from "../../entities/user";

export default class InMemoryUserRepository implements IUserRepository {
  private userList: User[] = [];

  async create(data: User): Promise<void> {
    try {
      this.userList.push(data);
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorHandler) {
        throw new ErrorHandler(500, "Failed to create user");
      }
      throw new Error((error as Error).message);
    }
  }

  public async findByEmail(email: String): Promise<User | null> {
    try {
      const response = this.userList.filter((item) => item.email == email);

      if (response.length < 1) {
        return null;
      }

      return response[0];
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  async listAll() {
    return this.userList;
  }
}
