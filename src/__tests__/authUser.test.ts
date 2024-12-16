import InMemoryUserRepository from "../repositories/inMemoryRepositories/InMemoryUserRepository";
import { ErrorHandler } from "../repositories/inMemoryRepositories/errorHandler/errorHandler";
import CreateUserService from "../services/createUserService";
import AuthUserService from "../services/AuthUserService";

describe("User authentication service", () => {
  let createUserService: CreateUserService;
  let authUserService: AuthUserService;
  let inMemoryRepo: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryRepo = new InMemoryUserRepository();
    createUserService = new CreateUserService(inMemoryRepo);
    authUserService = new AuthUserService(inMemoryRepo);
  });

  it("should be able to authenticate an user", async () => {
    await createUserService.execute({
      givenName: "name 1",
      familyName: "family 1",
      phone: "+15885904444",
      email: "ts.ipdm.ts@gmail.com",
      password: "pass123",
    });

    const resp = await authUserService.execute(
      "ts.ipdm.ts@gmail.com",
      "pass123"
    );

    expect(resp?.token).toBeTruthy();
    expect(resp?.user.email).toBe("ts.ipdm.ts@gmail.com");
  });

  it("should fail to authenticate user with wrong email", async () => {
    await createUserService.execute({
      givenName: "name 1",
      familyName: "family 1",
      phone: "+15885904444",
      email: "ts.ipdm.ts@gmail.com",
      password: "pass123",
    });

    const resp = await authUserService.execute("ts.ipdm@gmail.com", "pass123");

    expect(resp).toBe(null);
  });

  it("should fail to authenticate user with wrong password", async () => {
    await createUserService.execute({
      givenName: "name 1",
      familyName: "family 1",
      phone: "+15885904444",
      email: "ts.ipdm.ts@gmail.com",
      password: "pass123",
    });

    const resp = await authUserService.execute(
      "ts.ipdm.ts@gmail.com",
      "pass12345"
    );

    expect(resp).toBe(null);
  });

  it("should throw an error when user creation fails", async () => {
    jest.spyOn(inMemoryRepo, "findByEmail").mockImplementationOnce(() => {
      throw new ErrorHandler(500, "Failed to authenticate user");
    });

    await expect(
      authUserService.execute("test1@email.com", "pass12345")
    ).rejects.toThrow(new ErrorHandler(500, "Failed to authenticate user"));
  });
});
