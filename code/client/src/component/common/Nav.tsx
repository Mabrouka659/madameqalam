import { Link } from "react-router-dom";
import styles from "../../assets/css/nav.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../provider/UserProvider";
import { RiAccountPinBoxFill } from "react-icons/ri";

const closeAllMenus = () => {
  setMenuOpen(false);
  setDropdownOpen(false);
};



const Nav = () => {
	// Fonction pour basculer l'affichage du menu
	const toggleMenu = () => {
		console.log("Bouton cliqué!");
		setMenuOpen(!menuOpen);
	};
	//recupere le donne  l'utilisateur
	const { user } = useContext(UserContext);
	const [menuOpen, setMenuOpen] = useState(false); // Pour menu mobile ☰
	const [dropdownOpen, setDropdownOpen] = useState(false); // Pour le menu utilisateur

	return (
		<>
			{JSON.stringify(user)}
			{/* ajouter des évenement 
            utlisateur
            */}
			{/* Bouton menu burger (visible en mobile) */}
			<button
				className={styles["btn-nav-mobile"]}
				type="button"
				onClick={() => setMenuOpen(!menuOpen)}
			>
				☰
			</button>

			{/* Menu de navigation */}
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
									<Link
										to="/deconnection"
										onClick={() => setDropdownOpen(false)}
									>
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
		</>
	);
};

export default Nav;
function setDropdownOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setMenuOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

