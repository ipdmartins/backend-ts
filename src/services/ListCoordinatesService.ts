import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";
import { LatLng } from "../entities/coordinate";

type CreateCoordinateOutput = {
  coordinate_id: string;
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
