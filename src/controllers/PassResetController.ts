import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import NodeMailerService from "../services/NodeMailerService";

export default class PassResetController {
  private nodeMailerService: NodeMailerService;
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.nodeMailerService = new NodeMailerService(this.userRepository);
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
      const resp = await this.nodeMailerService.execute(email, true);
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
