import express, { type Request, type Response } from "express";

import ContactController from "../controller/contact_controller.js";

class ContactRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new ContactController().index);
		// 🔍 GET /contact/:id - Récupérer un contact par ID
		this.router.get("/:id", new ContactController().show);
       	// ➕ POST /contact - Créer un nouveau contact
		this.router.post("/", new ContactController().store);
        // ✏️ PUT /contact/:id - Modifier un contact
		this.router.put("/:id", new ContactController().update);
		// 🗑️ DELETE /contact/:id - Supprimer un contact
		this.router.delete("/:id", new ContactController().delete);


		return this.router;
	};
}

export default ContactRouter;