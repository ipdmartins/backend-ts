import crypto from "crypto";
export type LatLng = { lat: number; lng: number };

export type CoordinateProps = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

export class Coordinate {
  public readonly uuid: string;
  public props: Required<CoordinateProps>;

  constructor(props: CoordinateProps) {
    this.uuid = crypto.randomUUID();
    this.props = {
      ...props,
      points: props.points || [],
    };
  }

  // it can run business rules
  updateTitle(title: string) {
    this.title = title;
  }

  private set title(value: string) {
    this.props.title = value;
  }

  get getUuid() {
    return this.uuid;
  }

  get getTitle() {
    return this.props.title;
  }

  toJSON() {
    return {
      uuid: this.uuid,
      ...this.props,
    };
  }
}
