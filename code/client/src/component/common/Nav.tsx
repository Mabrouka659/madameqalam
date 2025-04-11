import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../provider/UserProvider";
import { RiAccountPinBoxFill } from "react-icons/ri";

const Nav = () => {
	const { user } = useContext(UserContext);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const closeAllMenus = () => {
		setDropdownOpen(false);
	};

	// Ferme le dropdown lors du clic à l'extérieur
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownOpen &&
				event.target instanceof Element &&
				!event.target.closest(`.${styles["site-nav"]}`)
			) {
				setDropdownOpen(false);
			}
		};
	
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownOpen]);
	

	return (
		<nav className={styles["site-nav-container"]}>
	<button
		type="button"
		className={styles["menu-btn"]}
		onClick={toggleDropdown}
		aria-label="Menu"
	>
		☰
	</button>

	<div className={`${styles["site-nav"]} ${dropdownOpen ? styles["site-nav-visible"] : ""}`}>
		<Link to="/oeuvres" onClick={closeAllMenus}>Oeuvres</Link>
		<Link to="/ateliers" onClick={closeAllMenus}>Ateliers</Link>
		<Link to="/biographie" onClick={closeAllMenus}>Biographie</Link>

		<div className={styles["account-menu"]}>
			<RiAccountPinBoxFill onClick={toggleDropdown} />
			{dropdownOpen && (
				<div className={styles["account-dropdown"]}>
					{!user?.id && (
						<>
							<Link to="/connection" onClick={closeAllMenus}>Connexion</Link>
							<Link to="/register" onClick={closeAllMenus}>Inscription</Link>
						</>
					)}

					{user?.id && (
						<>
							<Link to="/deconnection" onClick={closeAllMenus}>Déconnexion</Link>
							{user.role?.name === "admin" && (
								<Link to="/admin" onClick={closeAllMenus}>Administration</Link>
							)}
						</>
					)}
				</div>
			)}
		</div>
	</div>
</nav>

	);
};

export default Nav;
