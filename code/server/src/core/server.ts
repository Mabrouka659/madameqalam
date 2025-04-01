import express, {
	type Router,
	type Express,
	type Request,
	type Response,
} from "express";
import http from "node:http";
import HomepageRouter from "../router/homepage_router.js";
import NotFoundRouter from "../router/not_found_router.js";
import RoleRouter from "../router/role_router.js";
import cors from "cors";
import UserRouter from "../router/user_router.js";
import bookingRouter from "../router/booking_router.js";
import CategoryRouter from "../router/category_router.js";
import ImageRouter from "../router/image_router.js";
import artworkRouter from "../router/artwork_router.js";
import ContactRouter from "../router/contact_router.js";
import WorkshopRouter from "../router/workshop_router.js";
import SecurityRouter from "../router/security_router.js";
class Server {
	//propriétés
	private app: Express = express();
	private router: Router = express.Router();

	// constructeur
	constructor() {

		//gére les requêtes multi-origines 
		//CORS: Cors Origin Resource Sharing
		this.app.use(cors());

		// accéder au contenu d'une requéte HTTP-propriété body-au format JSON 
		this.app.use(express.json());
		//définir le dossier public
		this.app.use(express.static(process.env.ASSET_DIR as string));
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
		this.router.use("/user", new UserRouter().getRoutes());
		this.router.use("/booking", new bookingRouter().getRoutes());
		this.router.use("/category", new CategoryRouter().getRoutes());
		this.router.use("/workshop", new WorkshopRouter().getRoutes());
		this.router.use("/image", new ImageRouter().getRoutes());
		this.router.use("/artwork", new artworkRouter().getRoutes());
		this.router.use("/contact", new ContactRouter().getRoutes());
		this.router.use("/", new SecurityRouter().getRoutes());

		// route des routes inexistantes doit étre obligatoirement en derniere position
		this.router.use("*", new NotFoundRouter().getRoutes());
	};

	// créer le server
	public create = () => {
		return http.createServer(this.app);
	};
}
export default Server;
