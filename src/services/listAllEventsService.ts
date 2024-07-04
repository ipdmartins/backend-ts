import EventRepository from '../repositories/EventRepository';

export default class ListAllEventsService {
	constructor(private eventRepository: EventRepository) {
		this.execute = this.execute.bind(this);
	}

	async execute() {
		const events = await this.eventRepository.listAll();

		return events;
	}
}
