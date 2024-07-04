import * as crypto from 'crypto';

export type EventProps = {
	name: String;
	description: String;
	initial_date: String;
	final_date: String;
};

export class Event {
	private uuid: String;
	private name: String;
	private description: String;
	private initial_date: String;
	private final_date: String;

	public constructor(data: EventProps) {
		this.uuid = crypto.randomUUID();
		this.name = data.name;
		this.description = data.description;
		this.initial_date = data.initial_date;
		this.final_date = data.final_date;
	}

	get getId() {
		return this.uuid;
	}
	get getName() {
		return this.name;
	}
	get getDescription() {
		return this.description;
	}
	get getInitialDate() {
		return this.initial_date;
	}
	get getFinalDate() {
		return this.final_date;
	}
}
