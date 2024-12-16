import * as crypto from "crypto";

export type UserProps = {
  givenName: String;
  familyName: String;
  phone: String;
  email: String;
  password: String;
};

export class User {
  private uuid: String;
  private givenName: String;
  private familyName: String;
  private phone: String;
  private email: String;
  private password: String;
  private createdAt: Date;
  private updatedAt: Date;

  public constructor(data: UserProps) {
    this.uuid = crypto.randomUUID();
    this.givenName = data.givenName;
    this.familyName = data.familyName;
    this.phone = data.phone;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  get getId() {
    return this.uuid;
  }
  get getgivenName() {
    return this.givenName;
  }
  get getfamilyName() {
    return this.familyName;
  }
  get getphone() {
    return this.phone;
  }
  get getemail() {
    return this.email;
  }
  get getPassword() {
    return this.password;
  }
}
