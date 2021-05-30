import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


export class UsersServices {
	private usersRepository: Repository<User>;

	constructor() {
		this.usersRepository = getCustomRepository(UsersRepository);
	}

	async create(email: string): Promise<User> {
		const usersAlreadyExits = await this.usersRepository.findOne({
			email
		});

		if (usersAlreadyExits) {
			return usersAlreadyExits;
		}

		const users = this.usersRepository.create({
			email
		});

		await this.usersRepository.save(users);

		return users;
	}

	async findByEmail(email: string) : Promise<User> {
		const userExists = await this.usersRepository.findOne({
			email
		});

		return userExists;
	}
}