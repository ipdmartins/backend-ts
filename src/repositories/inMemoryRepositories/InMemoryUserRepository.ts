import { UserProps, User } from "../../entities/user";
import { IUserRepository } from "../IRepositories/IUserRepository";
import { ErrorHandler } from "./errorHandler/errorHandler";

export default class InMemoryUserRepository implements IUserRepository {
  private userList: User[] = [];

  async create({
    givenName,
    familyName,
    phone,
    email,
    password,
  }: UserProps): Promise<User> {
    // Validate input
    if (!givenName || !familyName || !phone || !email || !password) {
      throw new ErrorHandler(400, "Missing parameters to create a user");
    }

    const data = {
      givenName,
      familyName,
      phone,
      email,
      password,
    };

    try {
      const newUser = new User(data);
      this.userList.push(newUser);

      return newUser;
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw new ErrorHandler(500, "Failed to create user");
      }
      throw new Error((error as Error).message);
    }
  }

  async listAll() {
    return this.userList;
  }
}
