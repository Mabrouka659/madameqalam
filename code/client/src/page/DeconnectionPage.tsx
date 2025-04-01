
import { useContext, useEffect } from "react";
import ConnectionForm from "../component/admin/connection/ConnectionForm";
import { UserContext } from "../provider/UserProvider";
import { useNavigate } from "react-router-dom";
import type User from "../model/user";

const deconnectionPage = () => {
	  const {setUser}= useContext(UserContext);
const navigate =useNavigate();
useEffect(()=>{
//suprimer l'utilisateur 
setUser({}as User);
 //redirection
 navigate("/");


},[setUser, navigate]);



	return <></>;
		
};

export default deconnectionPage;
