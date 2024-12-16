import { User, UserProps } from "../../entities/user";

export type FilteredUser = {
  uuid: String;
  givenName: String;
  familyName: String;
  email: String;
  password: String;
};

export interface IUserRepository {
  create(data: UserProps): Promise<User>;
  findByEmail(email: String): Promise<FilteredUser | null>;
  listAll(): Promise<User[]>;
}
