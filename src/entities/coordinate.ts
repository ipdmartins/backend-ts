import crypto from "crypto";
export type LatLng = { lat: number; lng: number };

export type CoordinateProps = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

export class Coordinate {
  public readonly coordinate_id: string;
  public title: string;
  public startPosition: LatLng;
  public endPosition: LatLng;
  public points?: LatLng[];

  private constructor(props: CoordinateProps) {
    this.coordinate_id = crypto.randomUUID();

    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }
    this.title = props.title;
    this.startPosition = props.startPosition;
    this.endPosition = props.endPosition;
    this.points = props.points || [];
  }

  static async create(props: CoordinateProps) {
    if (!props.title || !props.startPosition || !props.endPosition) {
      throw new Error("Missing required properties");
    }
    return new Coordinate(props);
  }

  // it can run business rules
  updateTitle(title: string) {
    this.title = title;
  }

  toJSON() {
    return {
      coordinate_id: this.coordinate_id,
      title: this.title,
      startPosition: this.startPosition,
      endPosition: this.endPosition,
      points: this.points,
    };
  }
}
