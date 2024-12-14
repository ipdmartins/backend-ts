import { User, UserProps } from "../../entities/user";

export type FilteredUser = {
  uuid: string;
  givenName: string;
  familyName: string;
  email: string;
  password: string;
};

export interface IUserRepository {
  create(data: UserProps): Promise<User>;
  findByEmail(email: String): Promise<FilteredUser | null>;
  listAll(): Promise<User[]>;
}
