import { UserProps, User } from "../../entities/user";
import {
  FilteredUser,
  IUserRepository,
} from "../IRepositories/IUserRepository";
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

  public async findByEmail(email: String): Promise<FilteredUser | null> {
    try {
      const response = this.userList.filter((item) => item.getemail == email);

      if (response.length < 1) {
        return null;
      }

      const data = {
        uuid: response[0].getId,
        givenName: response[0].getgivenName,
        familyName: response[0].getfamilyName,
        email: response[0].getemail,
        password: response[0].getPassword,
      };

      return data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  async listAll() {
    return this.userList;
  }
}
