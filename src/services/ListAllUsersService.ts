import UserRepository from '../repositories/UserRepository';

export default class ListAllUsersService {
	constructor(private userRepository: UserRepository) {
		this.execute = this.execute.bind(this);
	}

	async execute() {
		const users = await this.userRepository.listAll();

		return users;
	}
}
