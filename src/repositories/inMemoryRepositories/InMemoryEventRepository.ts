import { EventProps, Event } from '../../entities/event';
import { IEventRepository } from '../IRepositories/IEventRepository';
import { ErrorHandler } from './errorHandler/errorHandler';

export default class InMemoryEventRepository implements IEventRepository {
	private eventList: Event[] = [];

	async create({
		name,
		description,
		initial_date,
		final_date,
	}: EventProps): Promise<Event> {
		// Validate input
		if (!name || !initial_date || !final_date) {
			throw new ErrorHandler(400, 'Missing parameters to create an event');
		}

		if (name.length > 32) {
			throw new ErrorHandler(400, 'Name must be 32 characters or less');
		}

		const data = {
			name,
			description,
			initial_date,
			final_date,
		};

		try {
			const newEvent = new Event(data);
			this.eventList.push(newEvent);

			return newEvent;
		} catch (error) {
			if (error instanceof ErrorHandler) {
				throw new ErrorHandler(500, 'Failed to create event');
			}
			throw new Error((error as Error).message);
		}
	}

	async listAll() {
		return this.eventList;
	}
}
