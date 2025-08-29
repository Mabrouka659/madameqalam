import type { Request, Response } from "express";
import ContactRepository from "../repository/contact_repository.js";

class ContactController {
	//récupérer tous les documents
	public index = async (req: Request, res: Response) => {
		try {

			const results = await new ContactRepository().selectAll();

			//réponse HTTp de succès

			res.status(200).json({
				status: 200,
				message: "OK",
				data: results
			});
		} catch (error) {
			// Si il y a une erreur, on renvoie une erreur HTTP
			res.status(500).json({
				status: 500,
				message: process.env.NODE_ENV === "prod" ? "Error" : error,
			});
		}
	};
// 🔍 RÉCUPÉRER UN CONTACT PAR ID (GET /contact/:id)
	public show = async (req: Request, res: Response) => {
		try {
			// On récupère l'ID depuis l'URL (ex: /contact/123)
			const _id = req.params.id;
			
			const result = await new ContactRepository().findByID({ _id });

			if (!result) {
				// Si le contact n'existe pas
				res.status(404).json({
					status: 404,
					message: "Contact not found",
				});
				return;
			}

			res.status(200).json({
				status: 200,
				message: "Contact found",
				data: result,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: process.env.NODE_ENV === "prod" ? "Error" : error,
			});
		}
	};

	// ➕ CRÉER UN NOUVEAU CONTACT (POST /contact)
	public store = async (req: Request, res: Response) => {
		try {
			// On récupère les données envoyées dans le body de la requête
			const contactData = req.body;

			// On vérifie que les données obligatoires sont présentes
			if (!contactData.email || !contactData.subject || !contactData.message) {
				res.status(400).json({
					status: 400,
					message: "Email, subject et message sont obligatoires",
				});
				return;
			}

			const result = await new ContactRepository().insert(contactData);

			res.status(201).json({
				status: 201,
				message: "Contact créé avec succès",
				data: result,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: process.env.NODE_ENV === "prod" ? "Error" : error,
			});
		}
	};

	// ✏️ MODIFIER UN CONTACT (PUT /contact/:id)
	public update = async (req: Request, res: Response) => {
		try {
			// On récupère l'ID depuis l'URL et les nouvelles données depuis le body
			const _id = req.params.id;
			const contactData = { ...req.body, _id };

			const result = await new ContactRepository().update(contactData);

			if (result.matchedCount === 0) {
				// Si aucun contact n'a été trouvé avec cet ID
				res.status(404).json({
					status: 404,
					message: "Contact not found",
				});
				return;
			}

			res.status(200).json({
				status: 200,
				message: "Contact modifié avec succès",
				data: result,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: process.env.NODE_ENV === "prod" ? "Error" : error,
			});
		}
	};

	// 🗑️ SUPPRIMER UN CONTACT (DELETE /contact/:id)
	public delete = async (req: Request, res: Response) => {
		try {
			// On récupère l'ID depuis l'URL
			const _id = req.params.id;

			const result = await new ContactRepository().delete({ _id });

			if (result.deletedCount === 0) {
				// Si aucun contact n'a été supprimé
				res.status(404).json({
					status: 404,
					message: "Contact not found",
				});
				return;
			}

			res.status(200).json({
				status: 200,
				message: "Contact supprimé avec succès",
				data: result,
			});
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: process.env.NODE_ENV === "prod" ? "Error" : error,
			});
		}
	};
}

export default ContactController;
