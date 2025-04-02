//REACT une fonction js qui retoune en HTML

import { Link } from "react-router-dom";
import styles from "../../assets/css/adminHome.module.css";

const AdminHomePage = () => {
	return (
		<div className={styles.container}>
			<h1>Administration</h1>
			<p>coucou</p>
			<Link to={"/admin/artwork"}>Manage artwork</Link>
		</div>
	);
};
export default AdminHomePage;
