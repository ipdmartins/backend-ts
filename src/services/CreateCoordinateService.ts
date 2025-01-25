import { ICoordinateRepository } from "../repositories/IRepositories/ICoordinateRepository";
import { Coordinate, LatLng } from "../entities/coordinate";

type ICreateCoordinateProps = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

export class CreateCoordinateService {
  constructor(private coordinateRepo: ICoordinateRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute(data: ICreateCoordinateProps): Promise<ICreateCoordinateProps> {
    const coordinate = await Coordinate.create(data);
    await this.coordinateRepo.create(coordinate);
    return coordinate.toJSON();
  }
}
