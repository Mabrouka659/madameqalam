import  type Role from "./role.js";
type User = {
	id: number;
	firstname: string;
	lastname: string;
	phone:string;
	email: string;
	role_id: number;
	role: Role;
};

export default User;
