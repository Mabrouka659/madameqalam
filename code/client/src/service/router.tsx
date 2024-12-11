import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";
import BaseLayout from "../layout/BaseLayout";

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
		],
	},
]);

export default router;
