import { User, UserProps } from "../entities/user";

describe("testing user entity", () => {
  test("constructor", async () => {
    let userProps: UserProps = {
      givenName: "givenName 1",
      familyName: "familyName 1",
      phone: "+15889944",
      email: "email1@email.com",
      password: "123",
    };
    let user = await User.create(userProps);

    expect(user.givenName).toEqual(userProps.givenName);
    expect(user.familyName).toEqual(userProps.familyName);
    expect(user.phone).toEqual(userProps.phone);
    expect(user.email).toEqual(userProps.email);
  });
});
