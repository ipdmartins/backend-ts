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
  public props: Required<UserProps>;
  private createdAt: Date;
  private updatedAt: Date;

  public constructor(data: UserProps) {
    this.user_id = crypto.randomUUID();
    this.props = {
      ...data,
    };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      uuid: this.user_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...this.props,
    };
  }
}
