import { EventProps } from '../entities/event';
import EventRepository from '../repositories/EventRepository';

export default class CreateEventService {
	constructor(private eventRepository: EventRepository) {
		this.execute = this.execute.bind(this);
	}

	async execute({ name, description, initial_date, final_date }: EventProps) {
		const event = await this.eventRepository.create({
			name,
			description,
			initial_date,
			final_date,
		});

		return event;
	}
}
