
import Booking from "../model/booking.js";
import MySQLService from "../service/mysql_service.js";

class BookingRepository{
	// nom de la table SQL
	private table = "booking";

	// récupérer tous les enregistrements
	// async crée une promesse
	// la fonction renvoie un objet unkouwn lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<Booking[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.booking;
		const sql = `
       SELECT 
        ${this.table}.*
       FROM 
        ${process.env.MYSQL_DATABASE}.${this.table}
        ;
    `;
		// exécuter la requéte
		// try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
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
	
	public selectOne = async (data: Partial<Booking>): Promise<Booking| unknown> => {
		// connexion au serveur MYSQL
		 const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.booking WHERE id = 1;
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
			 const result = (results as Booking[]).shift();

			// si la réquete a échouée
		return result;
		} catch (error) {			return error;
 		}
 	};
}

export default BookingRepository;