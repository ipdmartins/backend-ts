import { Event, EventProps } from '../entities/event';
import db from '../utils/sqliteConnections';
import { IEventRepository } from './IRepositories/IEventRepository';

export default class EventRepository implements IEventRepository {
	public async create({
		name,
		description,
		initial_date,
		final_date,
	}: EventProps): Promise<Event> {
		const eventData = {
			name,
			description,
			initial_date,
			final_date,
		};
		const event = new Event(eventData);

		const stmt = db.prepare(`INSERT INTO event VALUES (?,?,?,?,?)`);
		stmt.run(
			event.getId,
			event.getName,
			event.getDescription,
			event.getInitialDate,
			event.getFinalDate
		);

		return event;
	}

	public async listAll(): Promise<Event[]> {
		const stmt = db.prepare('SELECT * FROM event');

		const events = stmt.all() as Event[];

		return events;
	}
}
