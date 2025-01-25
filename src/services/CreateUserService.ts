import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository";
import { User, UserProps } from "../entities/user";
import { IUserRepository } from "../repositories/IRepositories/IUserRepository";

export default class CreateUserService {
  private static instance: CreateUserService;

  constructor(private userRepo: IUserRepository) {
    this.execute = this.execute.bind(this);
  }

  public static getInstance(userRepo: IUserRepository): CreateUserService {
    if (!CreateUserService.instance) {
      CreateUserService.instance = new CreateUserService(userRepo);
    }

    return CreateUserService.instance;
  }

  async execute({
    givenName,
    familyName,
    phone,
    email,
    password,
  }: UserProps): Promise<UserProps> {
    const userExists = await this.userRepo.findByEmail(email);

    if (userExists) {
      throw Error("Email already registered in an account");
    }

    const salt = await bcrypt.genSalt();
    const newPass = await bcrypt.hash(String(password), salt);

    const user = await User.create({
      givenName,
      familyName,
      phone,
      email,
      password: newPass,
    });

    await this.userRepo.create(user);

    return user.toJSON();
  }
}
