import { Event, EventProps } from '../../entities/event';

export interface IEventRepository {
	create(data: EventProps): Promise<Event>;
	listAll(): Promise<Event[]>;
}
