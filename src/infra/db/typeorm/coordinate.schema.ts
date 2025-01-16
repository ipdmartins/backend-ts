import { EntitySchema } from "typeorm";
import { Coordinate } from "../../../entities/coordinate";

export const CoordinateSchema = new EntitySchema<Coordinate>({
  name: "coordinate",
  target: Coordinate,
  columns: {
    coordinate_id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    title: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    startPosition: {
      type: "jsonb",
      nullable: false,
    },
    endPosition: {
      type: "jsonb",
      nullable: false,
    },
    points: {
      type: "jsonb",
      nullable: true,
    },
  },
});
