import express, { type Request, type Response } from "express";
import UserRepository from "../repository/user_repository.js";

class UserController {
	public index = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new UserRepository().selectAll();
		// console.log(results);

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
			message: "liste des utilisateurs récupérée",
			data: results,
		});
	};

	public one = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new UserRepository().selectOne(req.params);
		// console.log(results);

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
			message: "utilisateur récupéré",
			data: results,
		});
	};
	public insert = async (req: Request, res: Response) => {
		console.log("Données reçues dans le contrôleur", req.body);
		// créer un  enregistrements
		//req.body  permet de récuperer le contenu la réquete HTTP
		const results = await new UserRepository().insert(req.body);
		// console.log(results);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			console.error("erreur compléte:", results);
			res.status(400).json({
				status: 400,
				//afficher un simple message pour la production,sinon afficher l'erreur
				// message: process.env.NODE_ENV === "prod" ? "Error" : results,
				message: results.toString(), //convertir l'erreur en chaine
				stack: results.stack, //inclure la stack trace pour le débogage
			});
			//bloque la suite du script
			return;
		}
		// status :code de status HTTP
		// json : formater une réponse en JSON
		res.status(201).json({
			status: 201,
			message: "utilisateur créé",
			data: results,
		});
	};
	public update = async (req: Request, res: Response) => {
		// modifier un enregistrement
		//req.body permet de récuperer le contenu de la requéte HTTP
		const results = await new UserRepository().update(req.body);
		// console.log(results);

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
			message: "utilisateur modifié",
			data: results,
		});
	};
	public delete = async (req: Request, res: Response) => {
		// supprimer un enregistrement
		//req.body permet de récuperer le contenu de la requéte HTTP
		const results = await new UserRepository().delete(req.body);
		// console.log(results);

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
			message: "Utilisateur supprimé",
			data: results,
		});
	};
}

export default UserController;
