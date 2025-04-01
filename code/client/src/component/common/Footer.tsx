import styles from "../../assets/css/footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footercontent}>
				<div className={styles.logo}>
					<Link to="/">
						<img src="/img/logo.png" alt="logo madame qalam" />
					</Link>
				</div>
				<p className={styles.footertext}>
					<Link to="/contact">Contact</Link>
					<Link to="/mentions-legales">Mentions légales</Link> |
					<Link to="/politique-confidentialite">
						Politique de confidentialité
					</Link>{" "}
					|<Link to="/cgv">CGV</Link>© 2025 Madame Qalam - Tous droits réservés.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
