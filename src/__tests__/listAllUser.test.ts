import InMemoryUserRepository from '../repositories/inMemoryRepositories/InMemoryUserRepository';
import CreateUserService from '../services/createUserService';
import ListAllUsersService from '../services/listAllUsersService';

describe('List user service', () => {
	let inMemoryRepo: InMemoryUserRepository;
	let createUserService: CreateUserService;
	let listAllUsersService: ListAllUsersService;

	beforeEach(() => {
		inMemoryRepo = new InMemoryUserRepository();
		createUserService = new CreateUserService(inMemoryRepo);
		listAllUsersService = new ListAllUsersService(inMemoryRepo);
	});

	it('should not find any user', async () => {
		const resp = await listAllUsersService.execute();

		expect(resp).toHaveLength(0);
	});

	it('should be able to list users', async () => {
		const initial_date = '2024-06-25T15:00:00Z';
		const final_date = '2024-06-26T15:00:00Z';

		await createUserService.execute({
			clientId: 'fakeCliId',
			hostId: 'fakeHostId',
			type: 'super',
			description: 'desc any',
			initial_date,
			final_date,
		});

		await createUserService.execute({
			clientId: 'fakeCliOther',
			hostId: 'fakeHostOther',
			type: 'gold',
			description: 'desc other',
			initial_date,
			final_date,
		});

		const resp = await listAllUsersService.execute();

		expect(resp).toHaveLength(2);
		expect(resp[0].getType).toBe('super');
		expect(resp[1].getHostId).toBe('fakeHostOther');
	});
});
