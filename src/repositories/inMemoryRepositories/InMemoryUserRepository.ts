import { UserProps, User } from "../../entities/user";
import {
  FilteredUser,
  IUserRepository,
} from "../IRepositories/IUserRepository";
import { ErrorHandler } from "./errorHandler/errorHandler";

export default class InMemoryUserRepository implements IUserRepository {
  private userList: User[] = [];

  async create(data: User): Promise<void> {
    try {
      this.userList.push(data);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw new ErrorHandler(500, "Failed to create user");
      }
      throw new Error((error as Error).message);
    }
  }

  public async findByEmail(email: String): Promise<FilteredUser | null> {
    try {
      const response = this.userList.filter(
        (item) => item.props.email == email
      );

      if (response.length < 1) {
        return null;
      }

      const data = {
        uuid: response[0].uuid,
        givenName: response[0].props.givenName,
        familyName: response[0].props.familyName,
        email: response[0].props.email,
        password: response[0].props.password,
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
