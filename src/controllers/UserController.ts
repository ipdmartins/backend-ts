import { Request, Response } from 'express';
import CreateUserService from '../services/createUserService';
import ListAllUsersService from '../services/listAllUsersService';
import UserRepository from '../repositories/UserRepository';

export default class UserController {
	private userRepository: UserRepository;
	private createUserService: CreateUserService;
	private listAllUsersService: ListAllUsersService;

	constructor() {
		this.userRepository = new UserRepository();
		this.createUserService = new CreateUserService(this.userRepository);
		this.listAllUsersService = new ListAllUsersService(this.userRepository);
		this.create = this.create.bind(this);
		this.listAll = this.listAll.bind(this);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { clientId, hostId, type, description, initial_date, final_date } =
			request.body;

		// Validate input
		if (!clientId || !hostId || !type || !initial_date || !final_date) {
			return response
				.status(400)
				.json({ error: 'Missing parameters to create a user' });
		}

		try {
			const user = await this.createUserService.execute({
				clientId,
				hostId,
				type,
				description,
				initial_date,
				final_date,
			});

			return response.status(201).json(user);
		} catch (error) {
			console.error(error);
			return response.status(500).json({ error: 'Failed to create user' });
		}
	}

	public async listAll(request: Request, response: Response) {
		try {
			const users = await this.listAllUsersService.execute();

			return response.json(users);
		} catch (error) {
			console.error('Error listing all users:', error);
			return response.status(500).json({ error: 'Failed to list users' });
		}
	}
}
