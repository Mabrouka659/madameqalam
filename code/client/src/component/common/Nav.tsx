import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../provider/UserProvider";
import { RiAccountPinBoxFill } from "react-icons/ri";

// Removed from global scope and will be defined inside the Nav component

const Nav = () => {
	// Fonction pour basculer l'affichage du menu

	//recupere le donne  l'utilisateur
	const { user } = useContext(UserContext);
	const [menuOpen, setMenuOpen] = useState(false); // Pour menu mobile ☰
	const [dropdownOpen, setDropdownOpen] = useState(false); // Pour le menu utilisateur

	const closeAllMenus = () => {
		setMenuOpen(false);
		setDropdownOpen(false);
	};
	JSON.stringify(user);

	return <>
		<button
			typeof="button"
			className={styles["btn-nav-mobile"]}
			type="button"
			onClick={() => setMenuOpen(!menuOpen)}
		>
			☰
		</button>
		;
		<nav
			className={`${styles["site-nav"]} ${menuOpen ? styles["site-nav-visible"] : ""}`}
		>
			<Link to="/" onClick={closeAllMenus}>
				Accueil
			</Link>
			<Link to="/oeuvres" onClick={closeAllMenus}>
				Oeuvres
			</Link>
			<Link to="/ateliers" onClick={closeAllMenus}>
				Ateliers
			</Link>
			<Link to="/biographie" onClick={closeAllMenus}>
				Biographie
			</Link>

			{/* <Link className={styles.con} to="/connection" onClick={toggleMenu} >
                <RiAccountPinBoxFill className = {styles["per-icon"]} />
                <span className={styles.titre} >Connection</span>

                </Link>
                

{user.id ?(
    <Link to={"/deconnection"}>
    
    Deconnection
    </Link>

):( <>
<Link  to={"/register"} >
Register
</Link>




</>

)}





                <Link to={"/admin"}>Administration</Link>

{
                    user.role?.name === "admin" ? (
                        <Link onClick={toggleMenu} to={"admin"}>
                            Administration
                        </Link>
                    ) : null
                } */}

			<div className={styles["account-menu"]}>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => setDropdownOpen(!dropdownOpen)}
					className={styles["account-button"]}
				>
					<RiAccountPinBoxFill className={styles["per-icon"]} />
				</button>

				{dropdownOpen && (
					<div className={styles["account-dropdown"]}>
						{!user.id && (
							<>
								<Link to="/connection" onClick={closeAllMenus}>
									Connexion
								</Link>
								<Link to="/register" onClick={closeAllMenus}>
									Inscription
								</Link>
							</>
						)}

						{user.id && (
							<>
								<Link to="/deconnection" onClick={() => setDropdownOpen(false)}>
									Déconnexion
								</Link>
								{user.role?.name === "admin" && (
									<Link to="/admin" onClick={() => setDropdownOpen(false)}>
										Administration
									</Link>
								)}
							</>
						)}
					</div>
				)}
			</div>
		</nav>
		;
	</>
};

export default Nav;
