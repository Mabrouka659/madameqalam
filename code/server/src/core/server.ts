import express, {
	type Router,
	type Express,
	type Request,
	type Response,
} from "express";
import http from "node:http";
import HomepageRouter from "../router/homepage_router.js";
import NotFoundRouter from "../router/not_found_router.js";

class Server {
	//propriétés
	private app: Express = express();
	private router: Router = express.Router();

	// constructeur
	constructor() {
		// relier le routeur à l'application
		this.app.use(this.router);

		//liste des routeurs
		this.routerslist();
	}
	// méthodes
	private routerslist = () => {
		/*
        préfixe à toutes les routes d'un routeur 
        */
		this.router.use("/", new HomepageRouter().getRoutes());

		this.router.use("*", new NotFoundRouter().getRoutes());
	};

	// créer le server
	public create = () => {
		return http.createServer(this.app);
	};
}
export default Server;
