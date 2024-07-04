import { ErrorHandler } from '../repositories/inMemoryRepositories/errorHandler/errorHandler';
import InMemoryEventRepository from '../repositories/inMemoryRepositories/InMemoryEventRepository';
import CreateEventService from '../services/createEventService';

describe('Create event service', () => {
	let createEventService: CreateEventService;
	let inMemoryRepo: InMemoryEventRepository;

	beforeEach(() => {
		inMemoryRepo = new InMemoryEventRepository();
		createEventService = new CreateEventService(inMemoryRepo);
	});

	it('should be able to create a event user', async () => {
		const initial_date = '2024-06-25T15:00:00Z';
		const final_date = '2024-06-26T15:00:00Z';

		const resp = await createEventService.execute({
			name: 'fakeNameId',
			description: 'desc any',
			initial_date,
			final_date,
		});

		expect(resp.getName).toBe('fakeNameId');
		expect(resp.getDescription).toBe('desc any');
		expect(resp.getInitialDate).toBe(initial_date);
		expect(resp.getFinalDate).toBe(final_date);
	});

	it('should fail to create a new user with null parameter', async () => {
		await expect(
			createEventService.execute({
				name: 'super',
				description: 'desc any',
				initial_date: null as any,
				final_date: '2024-06-26T15:00:00Z',
			})
		).rejects.toThrow(
			new ErrorHandler(400, 'Missing parameters to create an event')
		);
	});

	it('should throw an error when event creation fails', async () => {
		jest.spyOn(inMemoryRepo, 'create').mockImplementationOnce(() => {
			throw new ErrorHandler(500, 'Failed to create event');
		});

		await expect(
			createEventService.execute({
				name: 'super',
				description: 'desc any',
				initial_date: '2023-06-30T10:00:00Z',
				final_date: '2023-06-30T12:00:00Z',
			})
		).rejects.toThrow(new ErrorHandler(500, 'Failed to create event'));
	});
});
