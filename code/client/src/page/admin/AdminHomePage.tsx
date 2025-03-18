//REACT une fonction js qui retoune en HTML

import { Link } from "react-router-dom";

const AdminHomePage = () => {


    return (
    <div  className="container ">
            <h1 >Administration</h1>
            <p>coucou</p>
            <Link to={`/admin/artwork`}>Manage artwork</Link>
    </div>
    )
};
export default AdminHomePage;