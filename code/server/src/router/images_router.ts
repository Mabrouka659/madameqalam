import express, { type Request, type Response } from "express";
import ImagesController from "../controller/images_controller.js";

class ImagesRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new ImagesController().index);
		this.router.get("/:id", new ImagesController().one);

		return this.router;
	};
}

export default ImagesRouter;
