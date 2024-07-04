import { User, UserProps } from '../entities/user';
import db from '../utils/sqliteConnections';
import { IUserRepository } from './IRepositories/IUserRepository';

export default class UserRepository implements IUserRepository {
	public async create({
		clientId,
		hostId,
		type,
		description,
		initial_date,
		final_date,
	}: UserProps): Promise<User> {
		const userData = {
			clientId,
			hostId,
			type,
			description,
			initial_date,
			final_date,
		};
		const user = new User(userData);

		const stmt = db.prepare(`INSERT INTO user VALUES (?,?,?,?,?,?,?)`);
		stmt.run(
			user.getId,
			user.getClientId,
			user.getHostId,
			user.getType,
			user.getDescription,
			user.getInitialDate,
			user.getFinalDate
		);

		return user;
	}

	public async listAll(): Promise<User[]> {
		const stmt = db.prepare('SELECT * FROM user');

		const users = stmt.all() as User[];

		return users;
	}
}
