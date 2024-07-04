import InMemoryEventRepository from '../repositories/inMemoryRepositories/InMemoryEventRepository';
import CreateEventService from '../services/createEventService';
import ListAllEventsService from '../services/listAllEventsService';

describe('List events service', () => {
	let inMemoryRepo: InMemoryEventRepository;
	let createEventService: CreateEventService;
	let listAllEventsService: ListAllEventsService;

	beforeEach(() => {
		inMemoryRepo = new InMemoryEventRepository();
		createEventService = new CreateEventService(inMemoryRepo);
		listAllEventsService = new ListAllEventsService(inMemoryRepo);
	});

	it('should not find any event', async () => {
		const resp = await listAllEventsService.execute();

		expect(resp).toHaveLength(0);
	});

	it('should be able to list events', async () => {
		const initial_date = '2024-06-25T15:00:00Z';
		const final_date = '2024-06-26T15:00:00Z';

		await createEventService.execute({
			name: 'fake Name',
			description: 'desc any',
			initial_date,
			final_date,
		});

		await createEventService.execute({
			name: 'Volverine',
			description: 'desc other',
			initial_date,
			final_date,
		});

		const resp = await listAllEventsService.execute();

		expect(resp).toHaveLength(2);
		expect(resp[0].getName).toBe('fake Name');
		expect(resp[1].getName).toBe('Volverine');
	});
});
