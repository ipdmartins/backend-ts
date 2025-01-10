import { Coordinate, LatLng } from "../entities/coordinate";
import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";

type CreateCoordinateProps = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

export class CreateCoordinateService {
  constructor(private coordinateRepo: ICoordinateRepository) {}

  async execute(data: CreateCoordinateProps): Promise<CreateCoordinateProps> {
    const coordinate = new Coordinate(data);
    await this.coordinateRepo.create(coordinate);
    return coordinate.toJSON();
  }
}
