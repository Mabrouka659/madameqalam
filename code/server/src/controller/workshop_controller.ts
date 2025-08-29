import express, { type Request, type Response } from "express";
import WorkshopRepository from "../repository/workshop_repository.js";

class WorkshopController {
	// GET  /api /workshop - récupérer tous les workshops
	public index = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new WorkshopRepository().selectAll();
		// console.log(results);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				//afficher un simple message pour la production,sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			//Bloque la suite du script
			return;
		}
		// status :code de status HTTP
		// json : formater une réponse en JSON
		res.status(200).json({
			status: 200,
			message: "liste des workshops récupérée ",
			data: results,
		});
	};
	// GET /workshops/:id - Récupérer un workshop par son ID
	public one = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new WorkshopRepository().selectOne(req.params);
		// console.log(results);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				//afficher un simple message pour la production,sinon afficher l'erreur
				message:
					process.env.NODE_ENV === "prod"
						? "Error lors de la récupération du workshop"
						: results,
			});
			//bloque la suite du script
			return;
		}
		// si aucun résultt n'est trouvé
		if (!results) {
			res.status(404).json({
				status: 404,
				message: "Workshop non trouvé",
			});
			return;
		}

		// status :code de status HTTP
		// json : formater une réponse en JSON
		res.status(200).json({
			status: 200,
			message: "WOrkshop récupéré avec succés",
			data: results,
		});
	};
	// POST /workshops - Créer un nouveau workshop
	public insert = async (req: Request, res: Response) => {
		// créer un enregistrement
		//req.body permet de récuperer le contenu la réquete HTTP

		const results = await new WorkshopRepository().insert(req.body);
		// console.log(results);
		// Vérifier que les champs requis sont présents
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				//afficher un simple message pour la production,sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// bloque la suite du script
			return;
		}

		// Status :code de status HTTP(201 =Created)
		// json :formater une réponse en JSON
		res.status(201).json({
			status: 201,
			message: "Workshop créé ",
			data: results,
		});
	};
	// PUT /workshops/:id -Mettre à jour un workshop existant
	public update = async (req: Request, res: Response) => {
		// modifier un enregistrement
		//req.body permet de récuperer le contenu de la requête HTTP
		const data = {
			...req.body,
			id: Number.parseInt(req.params.id, 10),
		};

		// Vérifier si le workshop existe avant de le mettre à jour
		const exists = await new WorkshopRepository().selectOne({ id: data.id });
		if (!exists) {
			res.status(404).json({
				status: 404,
				message: "Workshop non trouvé",
			});
			return;
		}

		const results = await new WorkshopRepository().update(data);
		// console.log(results);
		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				//afficher un simple message pour la production,sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// bloque la suite du script
			return;
		}
		// Status :code de status HTTP
		// JSON /formater une réponse en JSON
		res.status(200).json({
			status: 200,
			message: "Workshop mis à jour avec succés",
			data: results,
		});
	};

	public delete = async (req: Request, res: Response) => {
		// supprimer un enregistrement
		//req.params permet de récuperer les paramètres de l'URL
		const data = {
			...req.body,
			id: Number.parseInt(req.params.id, 10),
		};
		const results = await new WorkshopRepository().delete(data);
		// console.log(results);
		// si la requête SQL renvoier une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});
			// bloque la suite du script
			return;
		}

		// status: code de status HTTP
		//JSON : formater une réponse en JSON
		res.status(200).json({
			status: 200,
			message: "Workshop supprimé avec succés",
			data: results,
		});
	};
}

export default WorkshopController;
