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

       console.log("🔵 CONTROLLER - DÉBUT UPDATE");
    console.log("🔵 req.params:", req.params);
    console.log("🔵 req.body:", req.body);


    try {
        // Convertir l'id en nombre
		const id = Number(req.params.id);
		 console.log("🔵 id converti:", id, "type:", typeof id);
        
        // Vérifier que l'id est valide
        // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
		if (isNaN(id)) {
			console.log("🔴 ID INVALIDE - ENVOI RÉPONSE 400");
            return res.status(400).json({
                status: 400,
                message: "ID invalide"
            });
        }

		const data = { ...req.body, id };
		 console.log("🔵 data préparée pour repository:", data);
        
        console.log("🔵 APPEL DU REPOSITORY...");

		const results = await new CategoryRepository().update(data);
		console.log("🔵 RETOUR DU REPOSITORY:", results);
        console.log("🔵 Type du résultat:", typeof results);
        console.log("🔵 Est-ce une instance d'Error?", results instanceof Error);

		if (results instanceof Error) {
			
      console.log("🔴 ERREUR DÉTECTÉE - ENVOI RÉPONSE 400");
            console.log("🔴 Message d'erreur:", results.message);

            return res.status(400).json({
                status: 400,
                message: process.env.NODE_ENV === "prod" ? "Error" : results.message,
            });
        }
 console.log("🟢 SUCCÈS - ENVOI RÉPONSE 200");
        res.status(200).json({
            status: 200,
            message: "Catégorie mise à jour",
            data: results,
		});
		 console.log("🟢 RÉPONSE ENVOYÉE !");

	} catch (error) {
		 console.log("🔴 ERREUR CATCH:", error);
		
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
