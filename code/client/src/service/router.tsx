import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";
import BaseLayout from "../layout/BaseLayout";
import ArtworkPage from "../page/ArtworkPage";
import BiographiePage from "../page/BiographiePage";
import AteliersPage from "../page/AteliersPage";

const router = createBrowserRouter([

	{
        // préfixe de toutes les URL enfants
		path: "/",
		//utilisation d'une mise en page
		element: <BaseLayout />,

		//référence les pages utilisant la mise en page

		children: [
			
			{
				path: "accueil",
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
			

			
			

			
			
		
			


		],
	},
]);

export default router;
