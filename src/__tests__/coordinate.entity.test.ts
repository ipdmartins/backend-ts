import { CoordinateProps, Coordinate } from "../entities/coordinate";

describe("testing coordinate entity", () => {
  test("constructor", async () => {
    let coordinateProps: CoordinateProps = {
      title: "my route",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    let coordinate = await Coordinate.create(coordinateProps);

    expect(coordinate.title).toEqual(coordinateProps.title);
    expect(coordinate.startPosition).toEqual(coordinateProps.startPosition);
    expect(coordinate.endPosition).toEqual(coordinateProps.endPosition);
    expect(coordinate.points).toEqual([]);

    coordinateProps = {
      title: "my coordinate",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
      points: [{ lat: 10, lng: 11 }],
    };
    coordinate = await Coordinate.create(coordinateProps);
    expect(coordinate.title).toEqual(coordinateProps.title);
    expect(coordinate.startPosition).toEqual(coordinateProps.startPosition);
    expect(coordinate.endPosition).toEqual(coordinateProps.endPosition);
    expect(coordinate.points).toStrictEqual(coordinateProps.points);
  });

  test("update title", async () => {
    let coordinateProps: CoordinateProps = {
      title: "my coordinate",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    let coordinate = await Coordinate.create(coordinateProps);
    coordinate.updateTitle("new coordinate");
    expect(coordinate.title).toBe("new coordinate");
  });
});
