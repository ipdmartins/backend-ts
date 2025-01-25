import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUserRepository } from "../repositories/IRepositories/IUserRepository";

export default class AuthUserService {
  constructor(private userRepository: IUserRepository) {
    this.execute = this.execute.bind(this);
  }

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return null;

    const isValidPassword = await bcrypt.compare(
      password,
      String(user.password)
    );

    if (!isValidPassword) return null;

    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      "secret_key",
      {
        expiresIn: "12h",
      }
    );

    const data = {
      token,
      user: {
        user_id: user.user_id,
        givenName: user.givenName,
        familyName: user.familyName,
        email: user.email,
      },
    };

    return data;
  }
}
