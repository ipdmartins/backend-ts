import { Request, Response } from "express";
import { IUserRepository } from "../repositories/IRepositories/IUserRepository";
import ListAllUsersService from "../services/ListAllUsersService";
import CreateUserService from "../services/CreateUserService";
import UserRepository from "../repositories/UserRepository";

export default class UserController {
  private static instance: UserController;
  private userRepository: IUserRepository;

  private constructor() {
    this.userRepository = UserRepository.getInstance();
    this.create = this.create.bind(this);
    this.listAll = this.listAll.bind(this);
  }

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { givenName, familyName, phone, email, password } = request.body;

    try {
      const createUserService = CreateUserService.getInstance(
        this.userRepository
      );

      const user = await createUserService.execute({
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
      const listAllUsersService = ListAllUsersService.getInstance();
      const users = await listAllUsersService.execute();

      return response.json(users);
    } catch (error) {
      console.error("Error listing all users:", error);
      return response.status(500).json({ error: "Failed to list users" });
    }
  }
}
