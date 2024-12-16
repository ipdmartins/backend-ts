import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import PassResetService from "../services/PassResetService";

export default class PassResetController {
  private passResetService: PassResetService;
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.passResetService = new PassResetService(this.userRepository);
    this.resetPass = this.resetPass.bind(this);
  }

  public async resetPass(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    if (!email) {
      return response
        .status(400)
        .json({ error: "Missing email to reset password" });
    }

    try {
      const resp = await this.passResetService.execute(email);
      if (!resp) {
        return response.status(401).json({ message: "Invalid email" });
      }

      return response.status(201).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Failed to reset password" });
    }
  }
}
