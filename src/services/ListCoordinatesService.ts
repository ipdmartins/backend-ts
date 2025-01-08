import { LatLng } from "../entities/coordinate";
import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";

type CreateCoordinateOutput = {
  uuid: string;
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
}[];

export class ListCoordinatesService {
  constructor(private coordinateRepo: ICoordinateRepository) {}

  async execute(): Promise<CreateCoordinateOutput> {
    const resp = await this.coordinateRepo.listAll();

    return resp.map((r) => r.toJSON());
  }
}
