import { LatLng } from "../../entities/coordinate";

export interface ICreateCoordinateProps {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
}

export interface ICreateCoordinateService {
  execute(data: ICreateCoordinateProps): Promise<ICreateCoordinateProps>;
}
