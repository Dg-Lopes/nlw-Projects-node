import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
	username: string;
	chat: boolean;
}

export class SettingsServices {
	private settingsRepository: Repository<Setting>;

	constructor() {
		this.settingsRepository = getCustomRepository(SettingsRepository);
	}

	async create({ username, chat }: ISettingsCreate): Promise<Setting> {
		const userAlreadyExists = await this.settingsRepository.findOne({
			username
		});

		if (userAlreadyExists) {
			throw new Error("User already existes");
		}

		const settings = this.settingsRepository.create({
			username,
			chat
		});

		await this.settingsRepository.save(settings);

		return settings;
	}
	async findByUsername(username: string): Promise<Setting> {
		const settings = this.settingsRepository.findOne({ username });

		return settings;
	}
	async update(username: string, chat: boolean) : Promise<void> {
		await this.settingsRepository
			.createQueryBuilder()
			.update(Setting)
			.set({ chat })
			.where("username = :username", {
				username
			})
			.execute();
	}
}
