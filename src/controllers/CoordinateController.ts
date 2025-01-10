import { Request, Response } from "express";
import { InMemoryCoordinateRepository } from "../repositories/inMemoryRepositories/inMemoryCoordinateRepository";
import { CreateCoordinateService } from "../services/CreateCoordinateService";
import { ListCoordinatesService } from "../services/ListCoordinatesService";

export default class CoordinateController {
  private inMemoryCoordinateRepository: InMemoryCoordinateRepository;
  private createCoordinateService: CreateCoordinateService;
  private listCoordinatesService: ListCoordinatesService;

  constructor() {
    this.inMemoryCoordinateRepository = new InMemoryCoordinateRepository();
    this.createCoordinateService = new CreateCoordinateService(
      this.inMemoryCoordinateRepository
    );
    this.listCoordinatesService = new ListCoordinatesService(
      this.inMemoryCoordinateRepository
    );
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const coordinate = await this.createCoordinateService.execute(
        request.body
      );

      return response.status(201).json(coordinate);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Failed to create coordinate" });
    }
  }

  public async list(_request: Request, response: Response): Promise<Response> {
    try {
      const coordinates = await this.listCoordinatesService.execute();

      return response.json(coordinates);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Failed to list coordinates" });
    }
  }
}
