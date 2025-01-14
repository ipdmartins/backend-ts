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
  public props: Required<CoordinateProps>;

  private constructor(props: CoordinateProps) {
    this.coordinate_id = crypto.randomUUID();

    if (!props) {
      //@ts-expect-error use for ORM
      this.props = {};
      return;
    }
    this.props = {
      ...props,
      points: props.points || [],
    };
  }

  static create(props: CoordinateProps) {
    return new Coordinate(props);
  }

  // it can run business rules
  updateTitle(title: string) {
    this.title = title;
  }

  private set title(value: string) {
    this.props.title = value;
  }

  get getUuid() {
    return this.coordinate_id;
  }

  get getTitle() {
    return this.props.title;
  }

  toJSON() {
    return {
      uuid: this.coordinate_id,
      ...this.props,
    };
  }
}
