import InMemoryUserRepository from "../repositories/inMemoryRepositories/InMemoryUserRepository";
import CreateUserService from "../services/CreateUserService";
import ListAllUsersService from "../services/ListAllUsersService";

describe("List user service", () => {
  let inMemoryRepo: InMemoryUserRepository;
  let createUserService: CreateUserService;
  let listAllUsersService: ListAllUsersService;

  beforeEach(() => {
    inMemoryRepo = new InMemoryUserRepository();
    createUserService = new CreateUserService(inMemoryRepo);
    listAllUsersService = new ListAllUsersService(inMemoryRepo);
  });

  it("should not find any user", async () => {
    const resp = await listAllUsersService.execute();

    expect(resp).toHaveLength(0);
  });

  it("should be able to list users", async () => {
    const initial_date = "2024-06-25T15:00:00Z";
    const final_date = "2024-06-26T15:00:00Z";

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
    expect(resp[0].getemail).toBe("test1@email.com");
    expect(resp[1].getemail).toBe("test2@email.com");
  });
});
