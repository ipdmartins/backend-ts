import bcrypt from "bcrypt";
import { User, UserProps } from "../entities/user";
import UserRepository from "../repositories/UserRepository";

export default class CreateUserService {
  constructor(private userRepository: UserRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute({ givenName, familyName, phone, email, password }: UserProps) {
    const salt = await bcrypt.genSalt();
    const newPass = await bcrypt.hash(String(password), salt);

    const user = new User({
      givenName,
      familyName,
      phone,
      email,
      password: newPass,
    });

    await this.userRepository.create(user);

    return user.toJSON();
  }
}
