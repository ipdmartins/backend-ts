import { User, UserProps } from '../../entities/user';

export interface IUserRepository {
	create(data: UserProps): Promise<User>;
	listAll(): Promise<User[]>;
}
