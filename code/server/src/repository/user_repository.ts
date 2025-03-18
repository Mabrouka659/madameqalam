import type { Request, Response, NextFunction } from "express";
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
				const item:User = (results as User[])[i];
				//console.log (result);

				//composition permet d'associer la propriete d'un object à un autre objet

				item.role = await new RoleRepository().selectOne({
					id:item.role_id,
				}) as Role;

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
	public insert = async (
		data: Partial<User>,
	): Promise<User | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.booking;
		let sql = `
       INSERT INTO
       ${process.env.MYSQL_DATABASE}.${this.table}
      VALUES 
        (
	                NULL,
					:firstnam,
					:lastname,
					:phone,
					:email,
					:role_id
		
		
		)
        ;
    `;
		// exécuter la requéte
		// try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			//creer une transaction SQL
			connection.beginTransaction();
			/*executer la prémier requête */
			await connection.execute(sql, data);
			//    créer une variables sql stickant le dernier identifiant crée
			sql = ` 

		 SET @id = LAST_INSERT_ID();

		 `;
			// exécuter la requête
			await connection.execute(sql, data);
			//récupération de la requéte
			//results representes le premiere indices du array renvoyé
			//requetes preparees avec des variable des requetes SQL permets d'eviter les injection SQL

			// data permets de definir une valeur aux variables des requetes SQL

			const [results] = await connection.execute(sql, data);
			// valider la transaction lorsque l'ensemble des requêtes d'une transaction ont réussi
			connection.commit();

			// si la réquete a réussi
			return results;
		} catch (error) {
			// annuler l'ensemble des requêtes de la transaction si l'une des requêtes a échoué
			connection.rollback();
			//   si la requête a échoué
			return error;
		}
	};
	public update = async (
		data: Partial<User>,
	): Promise<User[] | unknown> => { 
		const connection = await new MySQLService().connect();
		const sql= `
		UPDATE 
		${process.env.MYSQL_DATABASE}.${this.table}
        SET
		${this.table}. firstname = :firstname,
		${this.table}.  lastname= :lastname,
		${this.table}.  phone= :phone,
		${this.table}.  email= :email,
		${this.table}.  role_id= :role_id,
		WHERE
		${this.table}.user_id = :user_id;
`;


try {
const[results]=await connection.execute(sql,data);
//si le requête est reussi
return results;
}
catch(error){
	return error;
}
};
public delete = async (
	data: Partial<User>,): Promise<User[] | unknown> => 
		{const connection = await new MySQLService().connect();
const sql =`

DELETE FROM 

${process.env.MYSQL_DATABASE}.${this.table}
WHERE 
${this.table}.user_id =:user_id;

`
;
try{
const[results]=await connection.execute(sql,data);
//si la requete est echoue
return results;
}catch(error){
	return error;
}
	};

}

export default UserRepository;

	