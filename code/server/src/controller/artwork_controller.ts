import express, { type Request, type Response } from "express";
import ArtworkRepository from "../repository/artwork_repository.js";

class ArtworkController {
	public index = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new ArtworkRepository().selectAll();
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
		const results = await new ArtworkRepository().selectOne(req.params);
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

	public insert = async (req: Request, res: Response) => {
		// créer un  enregistrements
		//req.body  permet de récuperer le contenu la réquete HTTP
		const results = await new ArtworkRepository().insert(req.body);
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
		res.status(201).json({
			status: 201,
			message: "artwork créer ",
			data: results,
		});
	};

	public update = async (req: Request, res: Response) => {
		// modifier un enregistrement 
		//req.body permet de récuperer le contenu de la requéte HTTP
		const results = await new ArtworkRepository().update(req.body);
		console.log(results);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status:400,
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
	
	public delete  = async (req: Request, res: Response) => {
		// supprimer un enregistrement 
		//req.body permet de récuperer le contenu de la requéte HTTP
		const results = await new ArtworkRepository().delete(req.body);
		console.log(results);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status:400,
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
			message: "Artwork deleted",
			data: results,
		});
	};
}

export default ArtworkController;
