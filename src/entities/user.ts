import * as crypto from 'crypto';

export type UserProps = {
	clientId: String;
	hostId: String;
	type: String;
	description: String;
	initial_date: String;
	final_date: String;
};

export class User {
	private uuid: string;
	private clientId: String;
	private hostId: String;
	private type: String;
	private description: String;
	private initial_date: String;
	private final_date: String;

	public constructor(data: UserProps) {
		this.uuid = crypto.randomUUID();
		this.clientId = data.clientId;
		this.hostId = data.hostId;
		this.type = data.type;
		this.description = data.description;
		this.initial_date = data.initial_date;
		this.final_date = data.final_date;
	}

	get getId() {
		return this.uuid;
	}
	get getClientId() {
		return this.clientId;
	}
	get getHostId() {
		return this.hostId;
	}
	get getType() {
		return this.type;
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
