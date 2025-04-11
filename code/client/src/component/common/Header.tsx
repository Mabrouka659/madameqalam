import { useState } from "react";
import Nav from "./Nav";
import styles from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const Header = () => {
	// const [menuOpen, setMenuOpen] = useState(false);

	// const toggleMenu = () => {
	// 	setMenuOpen(!menuOpen);
	// };

	return (
		<header className={styles["site-header"]}>
			<div className={styles["logo-container"]}>
				<Link to={"/"}>
					<img
						src="/img/logo.png"
						alt="logo Madame Qalam"
						className={styles.logo}
					/>
				</Link>
			</div>

			
			{/* Navigation */}
			<Nav />

			{/* Social Media Icons */}
			<div className={styles["social-icons"]}>
				<a 
					href="https://instagram.com/madame_qalam" 
					target="_blank" 
					rel="noopener noreferrer"
					className={styles["social-link"]}
					aria-label="Instagram"
				>
					<FaInstagram className={styles["instagram-icon"]} />
				</a>
			</div>
		</header>
	);
};

export default Header;