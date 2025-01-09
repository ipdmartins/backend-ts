import { AxiosResponse } from "axios";
import { User } from "../entities/user";
import axiosInstance from "../utils/conn";
import { FilteredUser, IUserRepository } from "./IRepositories/IUserRepository";

export default class UserRepository implements IUserRepository {
  public async create(user: User): Promise<void> {
    try {
      await axiosInstance.post("/users", user);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  public async findByEmail(email: String): Promise<FilteredUser | null> {
    try {
      const response: AxiosResponse<FilteredUser[]> = await axiosInstance.get(
        `/users?email=${email}`
      );

      if (response.data.length < 1) {
        return null;
      }

      return response.data[0];
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  public async listAll(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await axiosInstance.get("/users");

      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }
}
