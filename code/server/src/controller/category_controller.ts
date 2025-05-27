import express, { type Request, type Response } from "express";
import CategoryRepository from "../repository/category_repository.js";

class CategoryController {
	public index = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new CategoryRepository().selectAll();
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
			message: "OK",
			data: results,
		});
	};

	public one = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new CategoryRepository().selectOne(req.params);
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
			message: "OK",
			data: results,
		});
	};
	public insert = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new CategoryRepository().insert(req.body);
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
			message: "category créée",
			data: results,
		});
	};
	public update = async (req: Request, res: Response) => {
    try {
        // Convertir l'id en nombre
        const id = Number(req.params.id);
        
        // Vérifier que l'id est valide
        // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
                        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                message: "ID invalide"
            });
        }

        const data = { ...req.body, id };
        const results = await new CategoryRepository().update(data);

        if (results instanceof Error) {
            return res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "Error" : results.message,
            });
        }

        res.status(200).json({
            status: 200,
            message: "Catégorie mise à jour",
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Erreur serveur"
        });
    }
};
	public delete = async (req: Request, res: Response) => {
		// récuperer tous les enregistrements
		const results = await new CategoryRepository().delete(req.body);
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
			message: "category supprimée",
			data: results,
		});
	};
}

export default CategoryController;
