import express, { type Request, type Response } from "express";
import BookingController from "../controller/booking_controller.js";

class bookingRouter {
	//propriétés
	private router = express.Router();

	//méthode
	public getRoutes = () => {
		this.router.get("/", new BookingController().index);
		this.router.get("/:id", new BookingController().one);

		this.router.post("/", new BookingController().insert);
		this.router.put("/", new BookingController().update);

		this.router.delete("/", new BookingController().delete);



		return this.router;
	};
}

export default bookingRouter;