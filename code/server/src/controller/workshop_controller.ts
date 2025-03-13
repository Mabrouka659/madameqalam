import express, { type Request, type Response } from "express";
import WorkshopRepository from "../repository/workshop_repository.js";

class WorkshopController {
	public index = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new WorkshopRepository().selectAll();
		console.log(results);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				//afficher un simple message pour la production,sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			//bloque la suite du script
			return;
		}
		// status :code de status HTTP
		// json : formater une réponse en JSON
		res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	};

	public one = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new WorkshopRepository().selectOne(req.params);
		console.log(results);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				//afficher un simple message pour la production,sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			//bloque la suite du script
			return;
		}
		// status :code de status HTTP
		// json : formater une réponse en JSON
		res.status(200).json({
			status: 200,
			message: "OK",
			data: results,
		});
	};
}

export default WorkshopController;