import InMemoryUserRepository from "../repositories/inMemoryRepositories/InMemoryUserRepository";
import { ErrorHandler } from "../repositories/inMemoryRepositories/errorHandler/errorHandler";
import CreateUserService from "../services/createUserService";
import PassResetService from "../services/PassResetService";

describe("User pass reset service", () => {
  let createUserService: CreateUserService;
  let passResetService: PassResetService;
  let inMemoryRepo: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryRepo = new InMemoryUserRepository();
    createUserService = new CreateUserService(inMemoryRepo);
    passResetService = new PassResetService(inMemoryRepo);
  });

  it("should be able to send an email to reset password", async () => {
    await createUserService.execute({
      givenName: "name 1",
      familyName: "family 1",
      phone: "+15885904444",
      email: "ts.ipdm.ts@gmail.com",
      password: "pass123",
    });

    const resp = await passResetService.execute("ts.ipdm.ts@gmail.com");

    expect(resp?.accepted[0]).toBe("ts.ipdm.ts@gmail.com");
  });

  it("should fail to find user for pass reset", async () => {
    await createUserService.execute({
      givenName: "name 1",
      familyName: "family 1",
      phone: "+15885904444",
      email: "test2@gmail.com",
      password: "pass123",
    });

    const resp = await passResetService.execute("test3@gmail.com");

    expect(resp).toBe(null);
  });

  it("should throw an error when user reset password fails", async () => {
    jest.spyOn(inMemoryRepo, "findByEmail").mockImplementationOnce(() => {
      throw new ErrorHandler(500, "Failed to reset password");
    });

    await expect(passResetService.execute("test1@email.com")).rejects.toThrow(
      new ErrorHandler(500, "Failed to reset password")
    );
  });
});
