import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserRepository from "../repositories/UserRepository";

export default class AuthUserService {
  constructor(private userRepository: UserRepository) {
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

    const token = jwt.sign({ id: user.uuid, email: user.email }, "secret_key", {
      expiresIn: "12h",
    });

    const data = {
      token,
      user: {
        uuid: user.uuid,
        givenName: user.givenName,
        familyName: user.familyName,
        email: user.email,
      },
    };

    return data;
  }
}
