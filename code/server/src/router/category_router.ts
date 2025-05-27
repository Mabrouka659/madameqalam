import express, { type Request, type Response } from "express";
import CategoryController from "../controller/category_controller.js";

class CategoryRouter {
	//propriétés
	private router = express.Router();
	// Méthode
	public getRoutes = () => {
		// Middleware de débogage pour voir toutes les requêtes

		this.router.get("/", new CategoryController().index);
		this.router.get("/:id", new CategoryController().one);
		this.router.post("/", new CategoryController().insert);
		this.router.put("/", new CategoryController().update);
		this.router.delete("/", new CategoryController().delete);

		return this.router;
	};
}

export default CategoryRouter;
