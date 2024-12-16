import express, { type Request, type Response } from "express";
import CategoryController from "../controller/category_controller.js";

class CategoryRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new CategoryController().index);
		this.router.get("/:id", new CategoryController().one);

		return this.router;
	};
}

export default CategoryRouter;
