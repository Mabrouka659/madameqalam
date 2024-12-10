import express, { type Request, type Response } from "express";
import RoleController from "../controller/role_controller.js";

class RoleRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new RoleController().index);
		this.router.get("/:id", new RoleController().one);

		return this.router;
	};
}

export default RoleRouter;
