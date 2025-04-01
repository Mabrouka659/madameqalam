import express, { type Request, type Response } from "express";
import SecurityController from "../controller/security_controller.js";

class SecurityRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.post("/register", new SecurityController().register);
		this.router.post("/login", new SecurityController().connection);
		this.router.post("/auth", new SecurityController().auth);

		return this.router;
	};
}

export default SecurityRouter;
