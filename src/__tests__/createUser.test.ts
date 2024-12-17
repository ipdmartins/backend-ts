import InMemoryUserRepository from "../repositories/inMemoryRepositories/InMemoryUserRepository";
import { ErrorHandler } from "../repositories/inMemoryRepositories/errorHandler/errorHandler";
import CreateUserService from "../services/CreateUserService";

describe("Create user service", () => {
  let createUserService: CreateUserService;
  let inMemoryRepo: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryRepo = new InMemoryUserRepository();
    createUserService = new CreateUserService(inMemoryRepo);
  });

  it("should be able to create a new user", async () => {
    const resp = await createUserService.execute({
      givenName: "name 1",
      familyName: "family 1",
      phone: "+15885904444",
      email: "test1@email.com",
      password: "pass123",
    });

    expect(resp.getgivenName).toBe("name 1");
    expect(resp.getfamilyName).toBe("family 1");
    expect(resp.getphone).toBe("+15885904444");
    expect(resp.getemail).toBe("test1@email.com");
  });

  it("should fail to create a new user with null parameter", async () => {
    await expect(
      createUserService.execute({
        givenName: "name 1",
        familyName: "family 1",
        phone: "+15885904444",
        email: undefined as any,
        password: "pass123",
      })
    ).rejects.toThrow(
      new ErrorHandler(400, "Missing parameters to create a user")
    );
  });

  it("should throw an error when user creation fails", async () => {
    jest.spyOn(inMemoryRepo, "create").mockImplementationOnce(() => {
      throw new ErrorHandler(500, "Failed to create user");
    });

    await expect(
      createUserService.execute({
        givenName: "name 1",
        familyName: "family 1",
        phone: "+15885904444",
        email: "test1@email.com",
        password: "pass123",
      })
    ).rejects.toThrow(new ErrorHandler(500, "Failed to create user"));
  });
});
