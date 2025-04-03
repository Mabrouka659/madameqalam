import express, { type Request, type Response } from "express";
import artworkController from "../controller/artwork_controller.js";
import multer from "multer";
import ArtworkfileMiddleware from "../middleware/artwork_file_middleware.js";
import AuthorizationMiddleware from "../middleware/authorization_middleware.js";

class artworkRouter {
	//propriétés
	private router = express.Router();

	private upload = multer({ dest: `${process.env.ASSET_DIR}/img`});

	//méthode
	public getRoutes = () => {
		this.router.get("/", new artworkController().index);
		// créér une variable de route en la préfixant d'un :
		this.router.get("/:id", new artworkController().one);

		this.router.post("/",
			new AuthorizationMiddleware().check(["admin"]),
			this.upload.any(), new ArtworkfileMiddleware().process,
			new artworkController().insert);

		this.router.post("/register",
			new AuthorizationMiddleware().check(["admin"]),
			this.upload.any(), new ArtworkfileMiddleware().process,
			new artworkController().insert);
		// Ajoutez un middleware ou une configuration pour gérer les délais d'attente si nécessaire

		this.router.put("/",
			 new AuthorizationMiddleware().check(["admin"]),
			this.upload.any(), new ArtworkfileMiddleware().process, new artworkController().update);
		
		this.router.delete("/", new AuthorizationMiddleware().check(["admin"]),this.upload.any(), new artworkController().delete);

		return this.router;
	};
}

export default artworkRouter;
