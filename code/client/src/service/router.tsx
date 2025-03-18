import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";
import BaseLayout from "../layout/BaseLayout";
import ArtworkPage from "../page/ArtworkPage";
import BiographiePage from "../page/BiographiePage";
import AteliersPage from "../page/AteliersPage";
import AdminArtworkPage from "../page/admin/Artwork/AdminArtworkPage";
import AdminHomePage from "../page/admin/AdminHomePage";
// import AdminContactFormPage from "../page/admin/Artwork/AdminArtworkFormPage";
// import AdminContactPage from "../page/admin/Artwork/AdminArtworkFormPage";
import AdminArtworkFormPage from "../page/admin/Artwork/AdminArtworkFormPage";
import  AdminArtworkDeletePage from "../component/admin/artwork/AdminArtworkDeletePage";

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











		],
	},
	{
		// préfixe de toutes les URL enfants
		path: "/admin/",
		//utilisation d'une mise en page
		element: <BaseLayout />,

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

			// {
			// 	path: "contact",
			// 	element: <AdminContactPage />,
			// },


			// {
			// 	path: "contact/form",
			// 	element: <AdminContactFormPage />,
			// },


			// {
			// 	path: "biographie",
			// 	element: <BiographiePage />,
			// },

			// {
			// 	path: "ateliers",
			// 	element: <AteliersPage />,
			// },











		],
	},
]);

export default router;
