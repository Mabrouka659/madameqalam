import type { Dispatch, SetStateAction } from "react";
import type User from "../user";

// type les donnees (par ex etats ,fonctions, gestionnaires d'etats)contenues dans le contexte
type UserProviderContext = {
	
		user: User;
		setUser : Dispatch<SetStateAction<User>>;
};

export default UserProviderContext;