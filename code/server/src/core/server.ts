import express, {
	type Router,
	type Express,
	type Request,
	type Response,
} from "express";
import http from "node:http";
import HomepageRouter from "../router/homepage_router.js";
import NotFoundRouter from "../router/not_found_router.js";
import RoleRouter from "../router/role_router copy.js";
import cors from "cors";
class Server {
	//propriétés
	private app: Express = express();
	private router: Router = express.Router();

	// constructeur
	constructor() {

		//gére les requêtes multi-origines 
		//CORS: Cors Origin Resource Sharing
		this.app.use(cors());

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
		this.router.use("/role", new RoleRouter().getRoutes());

		// route des routes inexistantes doit étre obligatoirement en derniere position
		this.router.use("*", new NotFoundRouter().getRoutes());
	};

	// créer le server
	public create = () => {
		return http.createServer(this.app);
	};
}
export default Server;
