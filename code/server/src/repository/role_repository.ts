import MySQLService from "../service/mysql_service.js";

class RoleRepository {
	// nom de la table SQL
	private table = "role";

	// récupérer tous les enregistrements
	public selectAll = async () => {
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
			const results = await connection.execute(sql);

			// si la réquete a échouée
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default RoleRepository;
