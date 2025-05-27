import express, { type Request, type Response } from "express";
import WorkshopController from "../controller/workshop_controller.js";

class WorkshopRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new WorkshopController().index);
		this.router.get("/:id", new WorkshopController().one);
		this.router.post("/", new WorkshopController().insert);
		this.router.put("/:id", new WorkshopController().update);
		this.router.delete("/:id", new WorkshopController().delete);

		return this.router;
	};
}

export default WorkshopRouter;
