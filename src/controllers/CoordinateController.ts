import { Request, Response } from "express";
import { injectable } from "inversify";
import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";
import { CreateCoordinateService } from "../services/CreateCoordinateService";
import { ICoordinateController } from "./IControllers/ICoordinateController";
import { ListCoordinatesService } from "../services/ListCoordinatesService";

@injectable()
export default class CoordinateController implements ICoordinateController {
  private createCoordinateService: CreateCoordinateService;
  private listCoordinatesService: ListCoordinatesService;

  constructor(coordinateRepo: ICoordinateRepository) {
    this.createCoordinateService = new CreateCoordinateService(coordinateRepo);
    this.listCoordinatesService = new ListCoordinatesService(coordinateRepo);
    this.create = this.create.bind(this);
    this.listAll = this.listAll.bind(this);
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

  public async listAll(
    _request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const coordinates = await this.listCoordinatesService.execute();

      return response.json(coordinates);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Failed to list coordinates" });
    }
  }
}
