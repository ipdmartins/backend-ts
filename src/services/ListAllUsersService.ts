import UserRepository from "../repositories/UserRepository";

export type UserPropsOutput = {
  uuid: string;
  givenName: String;
  familyName: String;
  phone: String;
  email: String;
  password: String;
  createdAt: Date;
  updatedAt: Date;
}[];

export default class ListAllUsersService {
  constructor(private userRepository: UserRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute(): Promise<UserPropsOutput> {
    const users = await this.userRepository.listAll();

    return users.map((r) => r.toJSON());
  }
}
