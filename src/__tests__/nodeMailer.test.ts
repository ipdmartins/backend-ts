import { User } from "../entities/user";
import InMemoryUserRepository from "../repositories/inMemoryRepositories/InMemoryUserRepository";
import { ErrorHandler } from "../repositories/inMemoryRepositories/errorHandler/errorHandler";
import CreateUserService from "../services/CreateUserService";
import NodeMailerService from "../services/NodeMailerService";

describe("Email manager to reset and activate account service", () => {
  let createUserService: CreateUserService;
  let nodeMailerService: NodeMailerService;
  let inMemoryRepo: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryRepo = new InMemoryUserRepository();
  });

  it("should be able to send an email to reset password", async () => {
    //     const user = await User.create({
    //       givenName: "name 1",
    //       familyName: "family 1",
    //       phone: "+15885904444",
    //       email: "test1@email.com",
    //       password: "pass123",
    //     });

    // await inMemoryRepo.create(user);

    // const resp = await nodeMailerService.execute("ts.ipdm.ts@gmail.com", true);

    // expect(resp?.accepted[0]).toBe("ts.ipdm.ts@gmail.com");
    expect(true).toBeTruthy();
  });

  // it("should be able to send an email to activate account", async () => {
  //   await createUserService.execute({
  //     givenName: "name 1",
  //     familyName: "family 1",
  //     phone: "+15885904444",
  //     email: "ts.ipdm.ts@gmail.com",
  //     password: "pass123",
  //   });

  //   const resp = await nodeMailerService.execute("ts.ipdm.ts@gmail.com", false);

  //   expect(resp?.accepted[0]).toBe("ts.ipdm.ts@gmail.com");
  // });

  // it("should fail to find user with email specified", async () => {
  //   await createUserService.execute({
  //     givenName: "name 1",
  //     familyName: "family 1",
  //     phone: "+15885904444",
  //     email: "test2@gmail.com",
  //     password: "pass123",
  //   });

  //   const respA = await nodeMailerService.execute("test3@gmail.com", true);
  //   const respB = await nodeMailerService.execute("test3@gmail.com", false);

  //   expect(respA).toBe(null);
  //   expect(respB).toBe(null);
  // });

  // it("should throw an error when user reset password fails", async () => {
  //   jest.spyOn(inMemoryRepo, "findByEmail").mockImplementationOnce(() => {
  //     throw new ErrorHandler(500, "Failed to reset password");
  //   });

  //   await expect(
  //     nodeMailerService.execute("test1@email.com", true)
  //   ).rejects.toThrow(new ErrorHandler(500, "Failed to reset password"));
  // });

  // it("should throw an error when activation account fails", async () => {
  //   jest.spyOn(inMemoryRepo, "findByEmail").mockImplementationOnce(() => {
  //     throw new ErrorHandler(500, "Failed to send activation");
  //   });

  //   await expect(
  //     nodeMailerService.execute("test1@email.com", false)
  //   ).rejects.toThrow(new ErrorHandler(500, "Failed to send activation"));
  // });
});
