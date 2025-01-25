import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";
import { LatLng } from "../entities/coordinate";

type ListCoordinateOutput = {
  coordinate_id: string;
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

export class ListCoordinatesService {
  constructor(private coordinateRepo: ICoordinateRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute(): Promise<ListCoordinateOutput[]> {
    const resp = await this.coordinateRepo.listAll();

    return resp.map((r) => r.toJSON());
  }
}
