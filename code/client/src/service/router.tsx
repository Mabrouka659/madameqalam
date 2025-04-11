import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";
import BaseLayout from "../layout/BaseLayout";
import ArtworkPage from "../page/ArtworkPage";
import BiographiePage from "../page/BiographiePage";
import AteliersPage from "../page/AteliersPage";
import AdminArtworkPage from "../page/Artwork/AdminArtworkPage";
import AdminHomePage from "../page/admin/AdminHomePage";
import AdminArtworkFormPage from "../page/Artwork/AdminArtworkFormPage";
import AdminArtworkDeletePage from "../page/Artwork/AdminArtworkDeletePage";
import RegisterPage from "../page/RegisterPage";
import ConnectionPage from "../page/ConnectionPage";
import DeconnectionPage from "../page/DeconnectionPage";
import Guard from "../component/common/Guard";

const router = createBrowserRouter([
	{
		// préfixe de toutes les URL enfants
		path: "/",
		//utilisation d'une mise en page
		element: <BaseLayout />,

		//référence les pages utilisant la mise en page

		children: [
			{
				path: "",
				element: <HomePage />,
			},

			{
				path: "contact",
				element: <ContactPage />,
			},

			{
				path: "oeuvres",
				element: <ArtworkPage />,
			},

			{
				path: "biographie",
				element: <BiographiePage />,
			},

			{
				path: "ateliers",
				element: <AteliersPage />,
			},
			{
				path: "connection",
				element: <ConnectionPage />,
			},
			{
				path: "deconnection",
				element: <DeconnectionPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
	{
		// préfixe de toutes les URL enfants
		path: "/admin/",
		//utilisation d'une mise en page
		element:(<Guard roles={['admin']}> 
			<BaseLayout />
		</Guard>),

		//référence les pages utilisant la mise en page

		children: [
			{
				path: "",
				element: <AdminHomePage />,
			},

			{
				path: "artwork",
				element: <AdminArtworkPage />,
			},

			{
				path: "artwork/form/:id?",
				element: <AdminArtworkFormPage />,
			},
			{
				path: "artwork/delete/:id",
				element: <AdminArtworkDeletePage />,
			},

	
		],
	},
]);

export default router;
