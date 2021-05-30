import { Request, Response } from "express";
import { UsersServices } from "../services/UsersServices";

export class UsersController {
	
	async create(request: Request, response: Response) : Promise<Response> {
		const { email } = request.body;
		const usersServices = new UsersServices();
		
		try {
			const users = await usersServices.create(email);

			return response.status(201).json(users);
		} catch (error) {
			return response.status(400).json({
				message: error.message
			});
		}
	}
}