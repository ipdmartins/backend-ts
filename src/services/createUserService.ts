import { UserProps } from '../entities/user';
import UserRepository from '../repositories/UserRepository';

export default class CreateUserService {
	constructor(private userRepository: UserRepository) {
		this.execute = this.execute.bind(this);
	}

	async execute({
		clientId,
		hostId,
		type,
		description,
		initial_date,
		final_date,
	}: UserProps) {
		const user = await this.userRepository.create({
			clientId,
			hostId,
			type,
			description,
			initial_date,
			final_date,
		});

		return user;
	}
}
