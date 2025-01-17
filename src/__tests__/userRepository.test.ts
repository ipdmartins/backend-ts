import InMemoryUserRepository from "../repositories/inMemoryRepositories/InMemoryUserRepository";
import { ErrorHandler } from "../repositories/inMemoryRepositories/errorHandler/errorHandler";
import ListAllUsersService from "../services/ListAllUsersService";
import CreateUserService from "../services/CreateUserService";

describe("Test user services on repository", () => {
  let createUserService: CreateUserService;
  let listAllUsersService: ListAllUsersService;
  let inMemoryRepo: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryRepo = new InMemoryUserRepository();
    createUserService = new CreateUserService(inMemoryRepo);
    listAllUsersService = new ListAllUsersService(inMemoryRepo);
  });

  it("should be able to create a new user", async () => {
    const resp = await createUserService.execute({
      givenName: "name 1",
      familyName: "family 1",
      phone: "+15885904444",
      email: "test1@email.com",
      password: "pass123",
    });

    expect(resp.givenName).toBe("name 1");
    expect(resp.familyName).toBe("family 1");
    expect(resp.phone).toBe("+15885904444");
    expect(resp.email).toBe("test1@email.com");
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

  it("should not find any user", async () => {
    const resp = await listAllUsersService.execute();

    expect(resp).toHaveLength(0);
  });

  it("should be able to list users", async () => {
    await createUserService.execute({
      givenName: "name 1",
      familyName: "family 1",
      phone: "+15885904444",
      email: "test1@email.com",
      password: "pass123",
    });

    await createUserService.execute({
      givenName: "name 2",
      familyName: "family 2",
      phone: "+25885904444",
      email: "test2@email.com",
      password: "pass223",
    });

    const resp = await listAllUsersService.execute();

    expect(resp).toHaveLength(2);
    expect(resp[0].email).toBe("test1@email.com");
    expect(resp[1].email).toBe("test2@email.com");
  });
});
