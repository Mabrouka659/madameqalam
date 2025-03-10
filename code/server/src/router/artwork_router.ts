import express, { type Request, type Response } from "express";
import artworkController from "../controller/artwork_controller.js";

class artworkRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new artworkController().index);
		// créér une variable de route en la préfixant d'un :
		this.router.get("/:id", new artworkController().one);

		this.router.post("/", new artworkController().insert);
		this.router.put("/", new artworkController().update);
		this.router.delete("/", new artworkController().delete);

		return this.router;
	};
}

export default artworkRouter;
