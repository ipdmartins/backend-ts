import UserRepository from "../repositories/UserRepository";

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
  private static instance: ListAllUsersService;

  constructor() {
    this.execute = this.execute.bind(this);
  }

  public static getInstance(): ListAllUsersService {
    if (!ListAllUsersService.instance) {
      ListAllUsersService.instance = new ListAllUsersService();
    }

    return ListAllUsersService.instance;
  }

  async execute(): Promise<UserPropsOutput> {
    const userRepository = UserRepository.getInstance();
    const users = await userRepository.listAll();

    return users.map((r) => r.toJSON());
  }
}
