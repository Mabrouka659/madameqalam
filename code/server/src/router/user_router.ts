import express, { type Request, type Response } from "express";
import UserController from "../controller/user_controller.js";

class UserRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new UserController().index);
		this.router.get("/:id", new UserController().one);

		return this.router;
	};
}

export default UserRouter;
