import type User from "../model/user.js";
import MySQLService from "../service/mysql_service.js";

class SecurityRepository {
	// nom de la table SQL
	private table = "user";

	// récupérer tous les enregistrements
	//async crée une promesse
	//la fonction renvoie un objet unkouwn lorsqu'une erreur est renvoyée
	public register = async (data: Partial<User>): Promise<User[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.school;
		const sql = `
       INSERT INTO
        ${process.env.MYSQL_DATABASE}.${this.table}

		VALUE
		(
		NULL,
		:firstname,
		:lastname,
		:phone,
		:email,
		:password,
		2
 
		)
        ;
    `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// récupérer les résultats de la requéte
			const [results] = await connection.execute(sql, data);

			// si la réquete a échouée
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default SecurityRepository;
