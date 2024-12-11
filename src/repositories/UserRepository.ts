import { AxiosResponse } from "axios";
import { User, UserProps } from "../entities/user";
import axiosInstance from "../utils/conn";
import { IUserRepository } from "./IRepositories/IUserRepository";

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
