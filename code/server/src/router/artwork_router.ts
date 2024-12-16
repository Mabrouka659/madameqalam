import express, { type Request, type Response } from "express";
import artworkController from "../controller/artwork_controller.js";

class artworkRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new artworkController().index);
		this.router.get("/:id", new artworkController().one);

		return this.router;
	};
}

export default artworkRouter;
