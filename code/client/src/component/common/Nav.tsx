import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import { useState } from "react";

const Nav = () => {
    // ✅ État pour afficher/cacher le menu
    const [menuOpen, setMenuOpen] = useState(false);

    // ✅ Fonction pour basculer l'affichage du menu
	const toggleMenu = () => {
		console.log("Bouton cliqué!");
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Bouton menu burger (visible en mobile) */}
            <button className={styles["btn-nav-mobile"]} type="button" onClick={toggleMenu}>
                ☰
            </button>

            {/* Menu de navigation */}
            <nav className={`${styles["site-nav"]} ${menuOpen ? styles["site-nav-visible"] : ""}`}>
                <Link to="/Accueil" onClick={toggleMenu}>Accueil</Link>
                <Link to="/Oeuvres" onClick={toggleMenu}>Oeuvres</Link>
                <Link to="/Ateliers" onClick={toggleMenu}>Ateliers</Link>
                <Link to="/biographie" onClick={toggleMenu}>Biographie</Link>
                <Link to="/Contact" onClick={toggleMenu}>Contact</Link>
            </nav>
        </>
    );
};

export default Nav;



