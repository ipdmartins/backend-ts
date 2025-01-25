import { Request, Response } from "express";
import { IUserRepository } from "../repositories/IRepositories/IUserRepository";
import NodeMailerService from "../services/NodeMailerService";

export default class PassResetController {
  private nodeMailerService: NodeMailerService;

  constructor(userRepository: IUserRepository) {
    this.nodeMailerService = new NodeMailerService(userRepository);
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
