import express, { type Request, type Response } from "express";
import WorkshopController from "../controller/workshop_controller.js";

class WorkshopRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new WorkshopController().index);
		this.router.get("/:id", new WorkshopController().one);

		return this.router;
	};
}

export default WorkshopRouter;