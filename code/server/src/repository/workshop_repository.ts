import type Workshop from "../model/workshop.js";
import MySQLService from "../service/mysql_service.js";

class WorkshopRepository {
	// nom de la table SQL
	private table = "workshop";

	// récupérer tous les enregistrements
	//async crée une promesse
	//la fonction renvoie un objet unkouwn lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<Workshop[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.school;
		const sql = `
       SELECT 
        ${this.table}.*
       FROM 
        ${process.env.MYSQL_DATABASE}.${this.table}
		
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

	//récupere les enregistrements selon une liste

	public selectInlist = async (): Promise<Workshop[] | unknown> => {
		const connect = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.school;
		const sql = `
		SELECT 
		 ${this.table}.*
		FROM 
		 ${process.env.MYSQL_DATABASE}.${this.table}
		 
	 `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// récupérer les résultats de la requéte
			const [results] = await connect.execute(sql);

			// si la réquete a échouée
			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Workshop>,
	): Promise<Workshop | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.orders  WHERE orders.id = IN (1,2);
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
			const result = (results as Workshop[]).shift();

			// si la réquete a échouée
			return result;
		} catch (error) {
			return error;
		}
	};
	public insert = async (
		data: Partial<Workshop>,
	): Promise<Workshop | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.orders  WHERE orders.id = IN (1,2);
		const sql = `
        INSERT INTO
		${process.env.MYSQL_DATABASE}.${this.table}
		(name, description, price)
		VALUES
       (:name, :description,:price)
    `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// récupérer les résultats de la requéte
			const [results] = await connection.execute(sql, data);
			// récupere l'ID généré
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const insertId = (results as any).insertId;

			// récuperer l'enregisterement créé
			return this.selectOne({ id: insertId });
		} catch (error) {
			return error;
		}
	};
	public update = async (
		data: Partial<Workshop>,
	): Promise<Workshop | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.orders  WHERE orders.id = IN (1,2);
		const sql = `
		UPDATE
        ${process.env.MYSQL_DATABASE}.${this.table}
		SET 
		name = :name,
		description = :description,
		price = :price
				

		WHERE
			id = :id
        ;
    `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// récupérer les résultats de la requéte
			await connection.execute(sql, data);

			// si la réquete a échouée
			return this.selectOne({ id: data.id });
		} catch (error) {
			return error;
		}
	};

	public delete = async (
		data: Partial<Workshop>,
	): Promise<Workshop | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.orders  WHERE orders.id = IN (1,2);
		const sql = `
		DELETE FROM
        ${process.env.MYSQL_DATABASE?.toString()}.${this.table}
		WHERE
			id = :id
        
    `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// exécute de la requéte
			const [result] = await connection.execute(sql, data);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const affectedRows = (result as any).affectedRows;

			// si la réquete a échouée

			return affectedRows > 0;
		} catch (error) {
			return error;
		}
	};
}

export default WorkshopRepository;
