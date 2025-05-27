import type Category from "../model/category.js";
import MySQLService from "../service/mysql_service.js";

class CategoryRepository {
	// nom de la table SQL
	private table = "category";

	// récupérer tous les enregistrements
	//async crée une promesse
	//la fonction renvoie un objet unkouwn lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<Category[] | unknown> => {
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

			// si la réquete a échouée
			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Category>,
	): Promise<Category | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.category WHERE id = 1;
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
			const result = (results as Category[]).shift();

			// si la réquete a échouée
			return result;
		} catch (error) {
			return error;
		}
	};
	public insert = async (
		data: Partial<Category>,
	): Promise<Category | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.category WHERE id = 1;
		let sql = `
       INSERT INTO
        ${process.env.MYSQL_DATABASE}.${this.table}
		VALUES
		(  
		 NULL,
		 :name
		
		)
			
        ;
    `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// créer une transaction SQL
			connection.beginTransaction();
			/*executer la prémier requête*/
			await connection.execute(sql, data);
			// créer une variable sql stickant le dernier identifiant crée
			sql = `

			 SET @id = LAST_INSERT_ID();

			 `;

			// exécuter la requête
			await connection.execute(sql, data);
			// récupération de la requête
			// results representes le premeiere indices du array renvoyé par le résultat
			// requêtes preparees avec des variable das requetes SQL permets d'eviter les injection SQL

			// data permet de definir une valeur aux variables des requetes SQL

			const [results] = await connection.execute(sql, data);
			// valider la transaction lorsque l'ensemble des requêtes d'une transaction sont réussiés
			connection.commit();
			// si la réquete a réussie
			return results;
		} catch (error) {
			// annuler l'ensemble des requêtes de la transaction si l'une des réquêtes a échouée
			connection.rollback();
			// si la réquete a échouée
			// renvoyer l'erreur
			return error;
		}
	};
	public update = async (
		data: Partial<Category>,
	): Promise<Category | unknown> => {
		console.log(" Repository - Début update avec data:", data);

		// Connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		try {
			// Les données sont déjà validées dans le controller
			const { id, name } = data;

			console.log(`Repository - ID: ${id} (type: ${typeof id}), Name: ${name}`);

			// Requête SQL simple
			const sql = `UPDATE ${process.env.MYSQL_DATABASE}.${this.table} SET name = ? WHERE id = ?`;

			console.log(" Repository - Exécution SQL:", sql);
			console.log("Repository - Paramètres:", [name, id]);

			const [results] = await connection.execute(sql, [name, id]);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const updateResult = results as any;

			console.log("Repository - Résultat SQL complet:", updateResult);
			console.log(" Repository - Affected rows:", updateResult.affectedRows);

			if (updateResult.affectedRows === 0) {
				throw new Error(`Aucune catégorie trouvée avec l'ID ${id}`);
			}

			const result = { id, name };
			console.log(" Repository - Succès, retour:", result);
			return result;
		} catch (error) {
			console.error("Repository - Erreur:", error);
			return error;
		} finally {
			console.log(" Repository - Fermeture connexion");
			await connection.end();
		}
	};

	public delete = async (
		data: Partial<Category>,
	): Promise<Category | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();
		const sql = `
       DELETE FROM
        ${process.env.MYSQL_DATABASE}.${this.table}
	  WHERE
		${this.table}.id = :id;
    `;

		try {
			const [results] = await connection.execute(sql, data);
			// si la réquete est réussie
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default CategoryRepository;
