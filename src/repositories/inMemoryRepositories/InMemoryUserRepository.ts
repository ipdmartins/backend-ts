import { UserProps, User } from '../../entities/user';
import { IUserRepository } from '../IRepositories/IUserRepository';
import { ErrorHandler } from './errorHandler/errorHandler';

export default class InMemoryUserRepository implements IUserRepository {
	private userList: User[] = [];

	async create({
		clientId,
		hostId,
		type,
		description,
		initial_date,
		final_date,
	}: UserProps): Promise<User> {
		// Validate input
		if (!clientId || !hostId || !type || !initial_date || !final_date) {
			throw new ErrorHandler(400, 'Missing parameters to create a user');
		}

		const data = {
			clientId,
			hostId,
			type,
			description,
			initial_date,
			final_date,
		};

		try {
			const newUser = new User(data);
			this.userList.push(newUser);

			return newUser;
		} catch (error) {
			if (error instanceof ErrorHandler) {
				throw new ErrorHandler(500, 'Failed to create user');
			}
			throw new Error((error as Error).message);
		}
	}

	async listAll() {
		return this.userList;
	}
}
