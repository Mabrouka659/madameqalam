import type Role from "../model/role.js";
import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";

import RoleRepository from "./role_repository.js";

class UserRepository {
	// nom de la table SQL
	private table = "user";

	// récupérer tous les enregistrements
	//async crée une promesse
	//la fonction renvoie un objet unkouwn lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<User[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.school;
		const sql = `
       SELECT 
        ${this.table}.*
       FROM 
        ${process.env.MYSQL_DATABASE}.${this.table}
        ;
    `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// récupérer les résultats de la requéte
			const [results] = await connection.execute(sql);
			//boucle sur les resultats
			for (let i = 0; i < (results as User[]).length; i++) {
				const result = (results as User[])[i];
				//console.log (result);

				//composition permet d'associer la propriete d'un object à un autre objet

				result.role = (await new RoleRepository().selectOne({
					id: result.role_id,
				})) as Role;

				// si la réquete a échouée
				return results;
			}
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (data: Partial<User>): Promise<User | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.school WHERE id = 1;
		const sql = `
       SELECT
        ${this.table}.*
       FROM 
        ${process.env.MYSQL_DATABASE}.${this.table}
		WHERE
			${this.table}.id = :id
        ;
    `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// récupérer les résultats de la requéte
			const [results] = await connection.execute(sql, data);

			//récuperer le premier résultat
			//shift permet de récupérer le premier indice d'un array
			const result = (results as User[]).shift() as User;
			//composition permet d'associer la propriété d'un object à un autre objet
			result.role = (await new RoleRepository().selectOne({
				id: result?.role_id,
			})) as Role;

			// si la réquete a échouée
			return result;
		} catch (error) {
			return error;
		}
	};
}

export default UserRepository;
