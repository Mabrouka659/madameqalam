import type Artwork from "../model/artwork.js";
import type Images from "../model/images.js";
import MySQLService from "../service/mysql_service.js";
import ArtworkRepository from "./artwork_repository.js";

class ImagesRepository {
	// nom de la table SQL
	private table = "images";

	// récupérer tous les enregistrements
	//async crée une promesse
	//la fonction renvoie un objet unkouwn lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<Images[] | unknown> => {
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

			for (let i = 0; i < (results as Images[]).length; i++) {
				const result = (results as Images[])[i];
				// console.log (result);
				//composition permet d'associer la propriete d'un object à un autre objet

				result.artwork = (await new ArtworkRepository().selectOne({
					id: result.artwork_id,
				})) as Artwork;
			}
			// si la réquete a échouée
			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Images>,
	): Promise<Images | unknown> => {
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
			const result = (results as Images[]).shift() as Images;
			//composition permet d'associer la propriété d'un object à un autre objet
			result.artwork= (await new ArtworkRepository().selectOne({
				id: result.artwork_id,
			})) as Artwork;
			

			// si la réquete a échouée
			return result;
		} catch (error) {
			return error;
		}
	};
}

export default ImagesRepository;
