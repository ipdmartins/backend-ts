import { User } from "../../entities/user";

export type FilteredUser = {
  uuid: String;
  givenName: String;
  familyName: String;
  email: String;
  password: String;
};

export interface IUserRepository {
  create(data: User): Promise<void>;
  findByEmail(email: String): Promise<FilteredUser | null>;
  listAll(): Promise<User[]>;
}
