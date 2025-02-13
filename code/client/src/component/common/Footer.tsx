import "./assets/css/reset.css";
import "./assets/css/style.css";

import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<Link to={"/"}>Home</Link>
			<Link to={"/"}>Legal</Link>
			<Link to={"/contact"}>contact</Link>
		</footer>
	);
};
export default Footer;
