import { Request, Response } from "express";
import { SettingsServices } from "../services/SettingsServices";

export class SettingsController {
	async create(request: Request, response: Response): Promise<Response> {
		const { username, chat } = request.body;

		const settingsServices = new SettingsServices();

		try {
			const settings = await settingsServices.create({ chat, username });

			return response.status(201).json(settings);
		} catch (error) {
			return response.status(400).json({
				message: error.message
			});
		}
	}

	async findByUsername(request: Request, response: Response): Promise<Response> {
		const { username } = request.params;

		const settingsServices = new SettingsServices();
		
		const settings = await settingsServices.findByUsername(username);

		return response.status(201).json(settings);
	}

	async update(request: Request, response: Response): Promise<Response> {
		const { username } = request.params;
		const { chat } = request.body;

		const settingsServices = new SettingsServices();
		
		const settings = await settingsServices.update(username, chat);

		return response.status(201).json(settings);
	}
}