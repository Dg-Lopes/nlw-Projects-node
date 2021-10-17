import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
	name: string;
	email: string;
	admin?: boolean;
}

export class CreateUsersServices {
	private usersRepository: Repository<User>;

	constructor() {
		this.usersRepository = getCustomRepository(UsersRepositories);
	}

	async execute({ name, email, admin }: IUserRequest): Promise<User> {
		if (!email) {
			throw new Error("Email incorrect");
		}

		const userAlreadyExits = await this.usersRepository.findOne({ email });

		if (userAlreadyExits) {
			throw new Error("User Already Exists!!!");
		}

		const user = this.usersRepository.create({ name, email, admin });

		await this.usersRepository.save(user);

		console.log(user);
		return user;
	}
}
