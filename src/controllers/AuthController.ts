import { Request, Response } from "express";
import AuthUserService from "../services/AuthUserService";
import UserRepository from "../repositories/UserRepository";

export default class AuthController {
  private authUserService: AuthUserService;
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.authUserService = new AuthUserService(this.userRepository);
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

      console.log(token);

      return response.status(201).json(token);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Failed to authenticate user" });
    }
  }
}
