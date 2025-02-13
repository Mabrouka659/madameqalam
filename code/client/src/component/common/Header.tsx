import Nav from "./Nav";
/*import d'un CSS d'un composant
 */
import style from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
	/* en React, l'attribut class est remplacé par className*/
	return (
		<header className={style["site-header"]}>
			<div className={style["site-logo"]}>
				{/* utiliser / pour cibler le dossier public  */}
				<Link to={"/"}>
					<img src="/img/logo.png" alt="" />
				</Link>
			</div>
			<Nav />
            
		</header>
	);
};

export default Header;
