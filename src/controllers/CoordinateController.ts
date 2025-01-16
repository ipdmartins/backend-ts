import { Request, Response } from "express";
import { CreateCoordinateService } from "../services/CreateCoordinateService";
import { ListCoordinatesService } from "../services/ListCoordinatesService";
import { CoordinateRepository } from "../repositories/CoordianteRepository";

export default class CoordinateController {
  private coordinateRepository: CoordinateRepository;
  private createCoordinateService: CreateCoordinateService;
  private listCoordinatesService: ListCoordinatesService;

  constructor(coordinateRepository: CoordinateRepository) {
    this.coordinateRepository = coordinateRepository;
    console.log("criando createCoordinateService");

    this.createCoordinateService = new CreateCoordinateService(
      this.coordinateRepository
    );
    console.log(this.createCoordinateService);

    this.listCoordinatesService = new ListCoordinatesService(
      this.coordinateRepository
    );
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
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
