import { IUserRepository } from "../repositories/IRepositories/IUserRepository";

export type UserPropsOutput = {
  user_id: string;
  givenName: String;
  familyName: String;
  phone: String;
  email: String;
  password: String;
  created_at: Date;
  updated_at: Date;
}[];

export default class ListAllUsersService {
  constructor(private userRepository: IUserRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute(): Promise<UserPropsOutput> {
    const users = await this.userRepository.listAll();

    return users.map((r) => r.toJSON());
  }
}
