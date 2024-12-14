import { AxiosResponse } from "axios";
import { User, UserProps } from "../entities/user";
import axiosInstance from "../utils/conn";
import { FilteredUser, IUserRepository } from "./IRepositories/IUserRepository";

export default class UserRepository implements IUserRepository {
  public async create({
    givenName,
    familyName,
    phone,
    email,
    password,
  }: UserProps): Promise<User> {
    const userData = {
      givenName,
      familyName,
      phone,
      email,
      password,
    };
    const user = new User(userData);

    try {
      await axiosInstance.post("/users", user);
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }

    return user;
  }

  public async findByEmail(email: String): Promise<FilteredUser | null> {
    try {
      const response: AxiosResponse<FilteredUser[]> = await axiosInstance.get(
        `/users?email=${email}`
      );

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
