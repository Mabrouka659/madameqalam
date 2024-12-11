import { Outlet } from "react-router-dom";
import Header from "../component/common/Header";
import Footer from "../component/common/Footer";

/*les mises en page permettent de definir les composants commun à plusieurs mises en page*/
const BaseLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			{/* Outlet permet definir l'emplacement du contenu particulier d'une page */}

			<Footer />
		</>
	);
};

export default BaseLayout;
