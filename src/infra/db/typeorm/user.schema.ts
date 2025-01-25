import { EntitySchema } from "typeorm";
import { User } from "../../../entities/user";

export const UserSchema = new EntitySchema<User>({
  name: "user",
  target: User,
  columns: {
    user_id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    givenName: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    familyName: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    phone: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});
