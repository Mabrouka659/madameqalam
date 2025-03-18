import { useState } from "react";
import Nav from "./Nav";
/*import d'un CSS d'un composant
 */
import styles from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	/* en React, l'attribut class est remplacé par className*/

	const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
	return (
		<header className={styles["site-header"]}>

			<div className={styles["logo-container"]}>
				{/* utiliser / pour cibler le dossier public  */}
				<Link to={"/accueil"}>
					<img src="/img/logo.png" alt="logo Madame Qalam"  className={styles["logo"]}/>
				</Link>
			</div>
			{/*Bouton menu burgur*/}
			<button className={styles["menu-btn"]} onClick={toggleMenu}> ☰</button>
			{/* Navigation */}
			<Nav menuOpen = {menuOpen} toggleMenu={toggleMenu} />



			
            

		</header>
	);
};

export default Header;
