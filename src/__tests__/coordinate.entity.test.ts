import { CoordinateProps, Coordinate } from "../entities/coordinate";

describe("testing route entity", () => {
  test("constructor", () => {
    let coordinateProps: CoordinateProps = {
      title: "my route",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    let coordinate = new Coordinate(coordinateProps);

    expect(coordinate.props).toStrictEqual({
      ...coordinateProps,
      points: [],
    });

    coordinateProps = {
      title: "my coordinate",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
      points: [{ lat: 10, lng: 11 }],
    };
    coordinate = new Coordinate(coordinateProps);

    expect(coordinate.props).toStrictEqual({
      ...coordinateProps,
      points: [{ lat: 10, lng: 11 }],
    });
  });

  test("update title", () => {
    let coordinateProps: CoordinateProps = {
      title: "my coordinate",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    let coordinate = new Coordinate(coordinateProps);
    coordinate.updateTitle("new coordinate");
    expect(coordinate.props.title).toBe("new coordinate");
  });
});
