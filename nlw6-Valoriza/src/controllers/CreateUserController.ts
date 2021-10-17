import { Request, Response } from "express";
import { CreateUsersServices } from "../services/CreateUsersServices";

export class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, admin } = request.body;

		const createUsersServices = new CreateUsersServices();

		const user = await createUsersServices.execute({ name, email, admin });

		return response.json(user);
	}
}
