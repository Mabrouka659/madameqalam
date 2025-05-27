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
		// SELECT role.* FROM madameqalam_dev.user;
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
			// biome-ignore lint/correctness/noUnreachable: <explanation>
			for (let i = 0; i < (results as User[]).length; i++) {
				const item: User = (results as User[])[i];
				//console.log (result);

				//composition permet d'associer la propriete d'un object à un autre objet

				item.role = (await new RoleRepository().selectOne({
					id: item.role_id,
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
		// SELECT role.* FROM madameqalam_dev.user WHERE id = 1;
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

	//sélectionner un utilisateur par son email
	public selectOneByEmail = async (email: string): Promise<User | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.user WHERE id = 1;
		const sql = `
   SELECT
	${this.table}.*
   FROM 
	${process.env.MYSQL_DATABASE}.${this.table}
	WHERE
		${this.table}.email = :email
	;
`;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// récupérer les résultats de la requéte
			const [results] = await connection.execute(sql, {
				email: email,
			});

			//récuperer le premier résultat
			//shift permet de récupérer le premier indice d'un array
			const result = (results as User[]).shift() as User;

			// si la réquete a échouée
			return result;
		} catch (error) {
			return error;
		}
	};

	public insert = async (data: Partial<User>): Promise<User | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();
		//Génerer une clé  si elle n'est pas fournie

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.user WHERE id = 1;
		let sql = `
INSERT INTO 
${process.env.MYSQL_DATABASE}.${this.table}
(firstname, lastname, phone, email, password, role_id)

VALUES
	 ( 
    :firstname,
	:lastname,
	:phone,
	:email,
	:password,
	:role_id
	)

`;

		// 	let sql = `
		//         INSERT INTO
		//         ${process.env.MYSQL_DATABASE}.${this.table}
		//        VALUES
		//          (
		//  	                NULL,
		//  					:firstname,
		//  					:lastname,
		//  					:phone,
		//  					:email,
		//  					:role_id,
		// 					:key

		//  		)
		//          ;
		//  `;
		// exécuter la requéte
		// try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			//creer une transaction SQL
			connection.beginTransaction();
			//Supprimer la clé des données car elle n'est pas dans la table
			// biome-ignore lint/performance/noDelete: <explanation>
			delete data.key;
			/*executer la prémier requête */
			await connection.execute(sql);
			//    créer une variables sql stockant le dernier identifiant crée
			sql = `

	              SET @id = LAST_INSERT_ID();

			 `;
			// exécuter la requête
			await connection.execute(sql);
			//récupération de l'utilisateur créé
			sql = `
					SELECT 
					${this.table}.*
					FROM
					${process.env.MYSQL_DATABASE}.${this.table}
					WHERE
				    id = @id;
					`;

			//results representes le premiere indices du array renvoyé
			//requetes preparees avec des variable des requetes SQL permets d'eviter les injection SQL

			// data permets de definir une valeur aux variables des requetes SQL

			const [results] = await connection.execute(sql, data);
			// valider la transaction lorsque l'ensemble des requêtes d'une transaction ont réussi
			await connection.commit();

			// si la réquete a réussi
			return (results as User[]).shift();
		} catch (error) {
			// annuler l'ensemble des requêtes de la transaction si l'une des requêtes a échoué
			await connection.rollback();
			console.log("Erreur dans insert", error);
			//   si la requête a échoué
			return error;
		} finally {
			//ferme la connexion
			if (connection) {
				await connection.end();
			}
		}
	};
	public update = async (data: Partial<User>): Promise<User[] | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `
			UPDATE
			${process.env.MYSQL_DATABASE}.${this.table}
             SET
			${this.table}.firstname = :firstname,
			${this.table}.lastname= :lastname,
	 		${this.table}.phone= :phone,
	 		${this.table}.email= :email,
	 		${this.table}.role_id= :role_id,
	 		WHERE
	 		${this.table}.id = :id;
            `;

		try {
			const [results] = await connection.execute(sql, data);
			//si le requête est réussie
			return results;
		} catch (error) {
			return error;
		}
	};
	public delete = async (data: Partial<User>): Promise<User[] | unknown> => {
		const connection = await new MySQLService().connect();
		const sql = `

	DELETE FROM

	 ${process.env.MYSQL_DATABASE}.${this.table}
	WHERE
	${this.table}.id =:id;

	 `;
		try {
			const [results] = await connection.execute(sql, data);
			//si la requête est réussie
			return results;
		} catch (error) {
			return error;
		}
	};
}
export default UserRepository;
