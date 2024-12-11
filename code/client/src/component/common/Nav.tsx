import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import { useRef, useState } from "react";

const Nav = () => {
	/* créer une référence  :lien vers un élement HTML 
    remplace l'utilisation de querySelector / querySelectorALL
    */

	const siteNav = useRef();
	// créer un état : useState
	/* const [état,setter de l'etat] = userState<type l'état > (valeur initiale de l'état)*/
	const [navMobileIsVisible, setNavMobileIsVisible] = useState<boolean>(false);
	//clic sur le bouton de navigation mobile

	const click = () => {
		// modifier l'état à l'aide du setter
		setNavMobileIsVisible(!navMobileIsVisible);
		// console.log(navMobileIsVisible);
	};

	/*les balises a sont remplacées par le composant Link
les attributs href sont remplacés to 
*/
	return (
		<>
			{/*
        attribut ref  permet de relier une référence à une balise HTML 
         */}
			{/* 
         la seul condition disponible dans le HTML de react : condition ternaire 
         condition ? vraie : faux 

         si une autre condiction est à utiliser , il est nécessaire de créer une fonction externe 
         */}
			<nav
				className={`${styles["site-nav"]} ${navMobileIsVisible ? styles["site-nav-visible"] : ""}`}
				// ref={siteNav}
			>
				<Link to={"/"}>Home</Link>
				<Link to={"/contact"}>contact</Link>
			</nav>
			{/* 
            ajouter des événements :
            - utiliser l'événement directement dans la balise
            -dans le composant, créer une fonction liée à l'évenement 
            */}
			<button
				className={styles["btn-nav-mobile"]}
				type="button"
				onClick={click}
			>
				-
			</button>
		</>
	);
};

export default Nav;
