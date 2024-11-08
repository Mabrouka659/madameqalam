import express, { type Request, type Response } from "express";
import RoleRepository from "../repository/role_repository.js";

class HomepageController {
	public index = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new RoleRepository().selectAll();
		console.log(results);

		// status :code de status HTTP
		// json : formater une réponse en JSON
		res.status(200).json({
			status: 200,
			message: "Madame Qalam API",
		});
	};
}

export default HomepageController;
