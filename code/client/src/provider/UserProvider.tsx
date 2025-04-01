// creer un contexte une donne associee a un provieder (composant)

import { createContext, useState } from "react";
import type UserProviderContext from "../model/context/user_provider_context";
import type UserProviderProps from "../model/propos/user_provider_propos";
import type User from "../model/user";

const UserContext = createContext({} as UserProviderContext);
//provider /composant qui contient un contexte
//children reresente les composant enfants du Provider
const UserProvider = ({ children }: UserProviderProps) => {
	//état stockant l'utilisateur connecté

	const [user, setUser] = useState<User>({} as User);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
export { UserContext, UserProvider };
