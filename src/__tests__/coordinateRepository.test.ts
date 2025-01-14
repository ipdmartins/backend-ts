import { CoordinateProps, Coordinate } from "../entities/coordinate";
import { InMemoryCoordinateRepository } from "../repositories/inMemoryRepositories/inMemoryCoordinateRepository";
import { CreateCoordinateService } from "../services/CreateCoordinateService";

describe("testing coordinate repository", () => {
  test("it should create a new coordinate", () => {
    const repository = new InMemoryCoordinateRepository();

    const coordinateProps: CoordinateProps = {
      title: "my route",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };
    const coordinate = new Coordinate(coordinateProps);

    repository.create(coordinate);

    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([coordinate]);
  });

  test("it should create a new coordinate using the service", async () => {
    const repository = new InMemoryCoordinateRepository();
    const createCoordinateService = new CreateCoordinateService(repository);

    const resp = await createCoordinateService.execute({
      title: "my route",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    });

    expect(repository.items).toHaveLength(1);
    expect(resp).toStrictEqual({
      uuid: repository.items[0].coordinate_id,
      title: "my route",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
      points: [],
    });
  });
});
