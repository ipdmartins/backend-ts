import { InMemoryCoordinateRepository } from "../repositories/inMemoryRepositories/inMemoryCoordinateRepository";
import { CreateCoordinateService } from "../services/CreateCoordinateService";
import { ListCoordinatesService } from "../services/ListCoordinatesService";
import { CoordinateProps } from "../entities/coordinate";

describe("testing coordinate repository", () => {
  test("it should create a new coordinate using the service", async () => {
    const repository = new InMemoryCoordinateRepository();
    const createCoordService = new CreateCoordinateService(repository);

    const coordinateProps: CoordinateProps = {
      title: "my route",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    };

    const resp = await createCoordService.execute(coordinateProps);

    expect(resp.title).toEqual(coordinateProps.title);
    expect(resp.startPosition).toEqual(coordinateProps.startPosition);
    expect(resp.endPosition).toEqual(coordinateProps.endPosition);
  });

  test("it should create coordinate and using the list service", async () => {
    const repository = new InMemoryCoordinateRepository();
    const createCoordinateService = new CreateCoordinateService(repository);
    const listCoordinatesService = new ListCoordinatesService(repository);

    const coord1 = await createCoordinateService.execute({
      title: "my route 1",
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
    });

    const coord2 = await createCoordinateService.execute({
      title: "my route 2",
      startPosition: { lat: 1, lng: 1 },
      endPosition: { lat: 2, lng: 5 },
      points: [
        { lat: 2, lng: 5 },
        { lat: 4, lng: 5 },
      ],
    });

    const resp = await listCoordinatesService.execute();

    expect(resp).toHaveLength(2);
    expect(resp[0].title).toEqual(coord1.title);
    expect(resp[0].startPosition).toEqual(coord1.startPosition);
    expect(resp[1].title).toEqual(coord2.title);
    expect(resp[1].points).toEqual(coord2.points);
  });
});
