import { Request, Response } from "express";
import { IUserRepository } from "../repositories/IRepositories/IUserRepository";
import NodeMailerService from "../services/NodeMailerService";

export default class NewActivationController {
  private nodeMailerService: NodeMailerService;

  constructor(userRepository: IUserRepository) {
    this.nodeMailerService = new NodeMailerService(userRepository);
    this.sendActivation = this.sendActivation.bind(this);
  }

  public async sendActivation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    if (!email) {
      return response
        .status(400)
        .json({ error: "Missing email to send activation" });
    }

    try {
      const resp = await this.nodeMailerService.execute(email, false);
      if (!resp) {
        return response.status(401).json({ message: "Invalid email" });
      }

      return response
        .status(201)
        .json({ message: "Activation sent successfully" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Failed to send activation" });
    }
  }
}
