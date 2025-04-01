import type Role from "./role";

//reprendre STRICTEMENT le nom des colonnes SQL
type User = {
	id: number;
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
	password: string;
	role_id: number;
	 //composition permet de d'association la propriété d'un objet à un autre objet
	role: Role;
	//partie aléatoire de la clé de décryptage 
	key: string;
};

export default User;
