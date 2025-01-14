import { EntitySchema } from "typeorm";
import { Coordinate } from "../../entities/coordinate";

export const CoordinateSchema = new EntitySchema({
  name: "coordinate",
  target: Coordinate,
  columns: {
    coordinate_id: {
      type: "uuid",
      primary: true,
    },
    title: {
      type: "string",
      length: 255,
    },
    startPosition: {
      type: "simple-json",
    },
    endPosition: {
      type: "simple-json",
    },
    points: {
      type: "simple-json",
    },
  },
});
