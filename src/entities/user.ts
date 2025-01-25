import * as crypto from "crypto";

export type UserProps = {
  givenName: String;
  familyName: String;
  phone: String;
  email: String;
  password: String;
};

export class User {
  public readonly user_id: string;
  public givenName: String;
  public familyName: String;
  public phone: String;
  public email: String;
  public password: String;
  public created_at: Date;
  public updated_at: Date;

  private constructor(props: UserProps) {
    this.user_id = crypto.randomUUID();

    if (!props) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }

    this.givenName = props.givenName;
    this.familyName = props.familyName;
    this.phone = props.phone;
    this.email = props.email;
    this.password = props.password;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static async create(props: UserProps) {
    return new User(props);
  }

  toJSON() {
    return {
      user_id: this.user_id,
      givenName: this.givenName,
      familyName: this.familyName,
      phone: this.phone,
      email: this.email,
      password: this.password,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
