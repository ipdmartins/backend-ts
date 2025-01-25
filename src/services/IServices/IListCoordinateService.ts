import { LatLng } from "../../entities/coordinate";

export interface ListCoordinateOutput {
  coordinate_id: string;
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
}

export interface IListCoordinateService {
  execute(): Promise<ListCoordinateOutput[]>;
}
