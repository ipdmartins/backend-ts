import InMemoryUserRepository from '../repositories/inMemoryRepositories/InMemoryUserRepository';
import { ErrorHandler } from '../repositories/inMemoryRepositories/errorHandler/errorHandler';
import CreateUserService from '../services/createUserService';

describe('Create user service', () => {
	let createUserService: CreateUserService;
	let inMemoryRepo: InMemoryUserRepository;
	beforeEach(() => {
		inMemoryRepo = new InMemoryUserRepository();
		createUserService = new CreateUserService(inMemoryRepo);
	});

	it('should be able to create a new user', async () => {
		const initial_date = '2024-06-25T15:00:00Z';
		const final_date = '2024-06-26T15:00:00Z';

		const resp = await createUserService.execute({
			clientId: 'fakeCliId',
			hostId: 'fakeHostId',
			type: 'super',
			description: 'desc any',
			initial_date,
			final_date,
		});

		expect(resp.getClientId).toBe('fakeCliId');
		expect(resp.getHostId).toBe('fakeHostId');
		expect(resp.getType).toBe('super');
		expect(resp.getInitialDate).toBe(initial_date);
		expect(resp.getFinalDate).toBe(final_date);
	});

	it('should fail to create a new user with null parameter', async () => {
		await expect(
			createUserService.execute({
				clientId: 'fakeCliId',
				hostId: 'fakeHostId',
				type: 'super',
				description: 'desc any',
				initial_date: null as any,
				final_date: '2024-06-26T15:00:00Z',
			})
		).rejects.toThrow(
			new ErrorHandler(400, 'Missing parameters to create a user')
		);
	});

	it('should throw an error when user creation fails', async () => {
		jest.spyOn(inMemoryRepo, 'create').mockImplementationOnce(() => {
			throw new ErrorHandler(500, 'Failed to create user');
		});

		await expect(
			createUserService.execute({
				clientId: 'fakeCliId',
				hostId: 'fakeHostId',
				type: 'super',
				description: 'desc any',
				initial_date: '2023-06-30T10:00:00Z',
				final_date: '2023-06-30T12:00:00Z',
			})
		).rejects.toThrow(new ErrorHandler(500, 'Failed to create user'));
	});
});
