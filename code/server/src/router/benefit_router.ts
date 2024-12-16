import express, { type Request, type Response } from "express";
import BenefitController from "../controller/benefit_controller.js";

class benefitRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new BenefitController().index);
		this.router.get("/:id", new BenefitController().one);

		return this.router;
	};
}

export default benefitRouter;