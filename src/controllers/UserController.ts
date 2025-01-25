import { Request, Response } from "express";
import { IUserRepository } from "../repositories/IRepositories/IUserRepository";
import ListAllUsersService from "../services/ListAllUsersService";
import CreateUserService from "../services/CreateUserService";

export default class UserController {
  private createUserService: CreateUserService;
  private listAllUsersService: ListAllUsersService;

  constructor(userRepository: IUserRepository) {
    this.createUserService = new CreateUserService(userRepository);
    this.listAllUsersService = new ListAllUsersService(userRepository);
    this.create = this.create.bind(this);
    this.listAll = this.listAll.bind(this);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { givenName, familyName, phone, email, password } = request.body;

    try {
      const user = await this.createUserService.execute({
        givenName,
        familyName,
        phone,
        email,
        password,
      });

      return response.status(201).json(user);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Failed to create user, try another email" });
    }
  }

  public async listAll(request: Request, response: Response) {
    try {
      const users = await this.listAllUsersService.execute();

      return response.json(users);
    } catch (error) {
      console.error("Error listing all users:", error);
      return response.status(500).json({ error: "Failed to list users" });
    }
  }
}
