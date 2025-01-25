import { Request, Response } from "express";
import { IUserRepository } from "../repositories/IRepositories/IUserRepository";
import AuthUserService from "../services/AuthUserService";

export default class AuthController {
  private authUserService: AuthUserService;

  constructor(userRepository: IUserRepository) {
    this.authUserService = new AuthUserService(userRepository);
    this.authenticate = this.authenticate.bind(this);
  }

  public async authenticate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: "Missing parameters to authenticate a user" });
    }

    try {
      const token = await this.authUserService.execute(email, password);
      if (!token) {
        return response
          .status(401)
          .json({ message: "Invalid email or password" });
      }

      return response.status(201).json(token);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Failed to authenticate user" });
    }
  }
}
