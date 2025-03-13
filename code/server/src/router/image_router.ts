import express, { type Request, type Response } from "express";
import ImageController from "../controller/image_controller.js";
import multer from "multer";
import ImagefileMiddleware from "../middleware/image_file_middleware.js";
class ImageRouter {
	//propriétés
	private router = express.Router();
	private upload = multer({ dest: `${process.env.ASSET_DIR}/img` });
	//méthode
	public getRoutes = () => {
		this.router.get("/", new ImageController().index);
		// créér une variable de route en la préfixant d'un :
		this.router.get("/:id", new ImageController().one);

		this.router.post("/",  new ImageController().insert);
		this.router.put("/", new ImageController().update);
		this.router.delete("/", new ImageController().delete);

		return this.router;
	};
}

export default ImageRouter;
