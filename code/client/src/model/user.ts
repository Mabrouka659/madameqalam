import Role from "./role";

//reprendre STRICTEMENT le nom des colonnes SQL
type User = {
	id: number;
	firstname: string;
	lastname: string ;
	phone: string;
	email: string;
	role_id: number;
	role:Role;
	//composition permet de d'association la propriété d'un objet à un autre objet
	
};

export default User ;