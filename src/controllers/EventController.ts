import { Request, Response } from 'express';
import CreateEventService from '../services/createEventService';
import ListAllEventsService from '../services/listAllEventsService';
import EventRepository from '../repositories/EventRepository';

export default class EventController {
	private eventRepository: EventRepository;
	private createEventService: CreateEventService;
	private listAllEventsService: ListAllEventsService;

	constructor() {
		this.eventRepository = new EventRepository();
		this.createEventService = new CreateEventService(this.eventRepository);
		this.listAllEventsService = new ListAllEventsService(this.eventRepository);
		this.create = this.create.bind(this);
		this.listAll = this.listAll.bind(this);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { name, description, initial_date, final_date } = request.body;

		// Validate input
		if (!name || !initial_date || !final_date) {
			return response
				.status(400)
				.json({ error: 'Missing parameters to create an event' });
		}

		try {
			const event = await this.createEventService.execute({
				name,
				description,
				initial_date,
				final_date,
			});

			return response.status(201).json(event);
		} catch (error) {
			console.error(error);
			return response.status(500).json({ error: 'Failed to create event' });
		}
	}

	public async listAll(request: Request, response: Response) {
		try {
			const events = await this.listAllEventsService.execute();

			return response.json(events);
		} catch (error) {
			console.error('Error listing all events:', error);
			return response.status(500).json({ error: 'Failed to list events' });
		}
	}
}
