import express, { type Request, type Response } from "express";
import artworkController from "../controller/artwork_controller.js";
import multer from "multer";
import ArtworkfileMiddleware from "../middleware/artwork_file_middleware.js";

class artworkRouter {
	//propriétés
	private router = express.Router();

	private upload = multer({ dest: `${process.env.ASSET_DIR}/img`});

	//méthode
	public getRoutes = () => {
		this.router.get("/", new artworkController().index);
		// créér une variable de route en la préfixant d'un :
		this.router.get("/:id", new artworkController().one);

		this.router.post("/", this.upload.any(), new ArtworkfileMiddleware().process, new artworkController().insert);

		this.router.put("/", this.upload.any(), new ArtworkfileMiddleware().process, new artworkController().update);
		
		this.router.delete("/", this.upload.any(), new ArtworkfileMiddleware().process, new artworkController().delete);

		return this.router;
	};
}

export default artworkRouter;
