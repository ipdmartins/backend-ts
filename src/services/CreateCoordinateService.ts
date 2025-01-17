import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";
import { Coordinate, LatLng } from "../entities/coordinate";

type CreateCoordinateProps = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

export class CreateCoordinateService {
  constructor(private coordinateRepo: ICoordinateRepository) {}

  async execute(data: CreateCoordinateProps): Promise<CreateCoordinateProps> {
    const coordinate = await Coordinate.create(data);
    await this.coordinateRepo.create(coordinate);
    return coordinate.toJSON();
  }
}
