import type Artwork from "../model/artwork.js";
import type Image from "../model/image.js";
import MySQLService from "../service/mysql_service.js";
import ArtworkRepository from "./artwork_repository.js";

class ImageRepository {
	// nom de la table SQL
	private table = "image";

	// récupérer tous les enregistrements
	//async crée une promesse
	//la fonction renvoie un objet unkouwn lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<Image[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_.;
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

			for (let i = 0; i < (results as Image[]).length; i++) {
				const result = (results as Image[])[i];
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

	public selectOne = async (data: Partial<Image>): Promise<Image | unknown> => {
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
			const result = (results as Image[]).shift() as Image;
			//composition permet d'associer la propriété d'un object à un autre objet
			result.artwork = (await new ArtworkRepository().selectOne({
				id: result.artwork_id,
			})) as Artwork;

			// si la réquete a échouée
			return result;
		} catch (error) {
			return error;
		}
	};

	public selectInList = async (data: string): Promise<Image[] | unknown> => {
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
			${this.table}.id IN (${data})
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
			// const result = (results as Image[]).shift() as Image;
			// //composition permet d'associer la propriété d'un object à un autre objet
			// result.artwork = (await new ArtworkRepository().selectOne({
			// 	id: result.artwork_id,
			// })) as Artwork;

			// si la réquete a échouée
			return results;
		} catch (error) {
			return error;
		}
	};

	// créér un enregistrement
	public insert = async (data: Partial<Image>): Promise<Image | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();
		// console.log(data);

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.image WHERE id = 1;
		const sql = `
					INSERT INTO
					${process.env.MYSQL_DATABASE}.${this.table}
					VALUE 
					(
						NULL,
						:name,
						:artwork_id
					)
			;
		`;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// exécute la premiére requéte
			await connection.execute(sql, data);
			// deuxième requète SQL de la transaction

			// resultat represent le premiere
			// récupérer les résultats de la requéte
			const [results] = await connection.execute(sql, data);
			// valider la transaction l'orsque l'ensemble des requétes d'une transation ont réussi
			connection.commit();
			// si la requète a réussi
			return results;
		} catch (error) {
			// annuler l'ensemble des réquetes de la transation si l'une des requétes d'une transaction ont réussi
			connection.rollback();
			//si la requéte a échoué
			return error;
		}
	};

	//  modifier un enregistrement
	public update = async (data: Partial<Image>): Promise<Image | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.image WHERE id = 1;
		const sql = `
				UPDATE
				${process.env.MYSQL_DATABASE}.${this.table}
				SEt
				
					
				    ${this.table}.name = :name,
					${this.table}.category_id = :category_id
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

			// si la requète a réussi
			return results;
		} catch (error) {
			return error;
		}
	};
	// supprimer un enregistrement
	public delete = async (data: Partial<Image>): Promise<Image | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.image WHERE id = 1;
		const sql = `
					DELETE FROM
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

			// si la requète a réussi
			return results;
		} catch (error) {
			return error;
		}
	};
}

export default ImageRepository;
