import type Artwork from "../model/artwork.js";
import type Category from "../model/category.js";
import MySQLService from "../service/mysql_service.js";
import CategoryRepository from "./category_repository.js";

class ArtworkRepository {
	// nom de la table SQL
	private table = "artwork";

	// récupérer tous les enregistrements
	//async crée une promesse
	//la fonction renvoie un objet unkouwn lorsqu'une erreur est renvoyée
	public selectAll = async (): Promise<Artwork[] | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.school;
		const sql = `
        SELECT 
        ${this.table}.*,
		GROUP_CONCAT(category.id) AS category_id
        FROM 
        ${process.env.MYSQL_DATABASE}.${this.table}
		LEFT JOIN
		${process.env.MYSQL_DATABASE}.category
		ON
		category.id =${this.table}.category_id
		GROUP BY
			${this.table}.id
        ;
    `;
		// exécuter la requéte
		//try / catch : permet d'éxecuter une instruction . si l'instruction échoue , une erreur
		// est récupérée
		try {
			// récupérer les résultats de la requéte
			const [results] = await connection.execute(sql);

			//boucle sur les resultats
			for (let i = 0; i < (results as Artwork[]).length; i++) {
				const result = (results as Artwork[])[i];

				//console.log (result);

				//composition permet d'associer la propriete d'un object à un autre objet

				result.category = (await new CategoryRepository().selectOne({
					id: result.category_id,
				})) as Category;
			}

			// si la réquete a échouée
			return results;
		} catch (error) {
			return error;
		}
	};

	public selectOne = async (
		data: Partial<Artwork>,
	): Promise<Artwork | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.artwork WHERE id = 1;

		const sql = `
        SELECT 
        ${this.table}.*,
		GROUP_CONCAT(category.id) AS category_id
        FROM 
        ${process.env.MYSQL_DATABASE}.${this.table}
		LEFT JOIN
		${process.env.MYSQL_DATABASE}.category
		ON
		category.id =${this.table}.category_id
		WHERE
			${this.table}.id = :id
		GROUP BY
			${this.table}.id
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
			const result = (results as Artwork[]).shift() as Artwork;
			//composition permet d'associer la propriété d'un object à un autre objet
			result.category = (await new CategoryRepository().selectOne({
				id: result.category_id,
			})) as Category;
			// si la réquete a échouée
			return result;
		} catch (error) {
			return error;
		}
	};

	// créér un enregistrement
	public insert = async (
		data: Partial<Artwork>,
	): Promise<Artwork | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();
		console.log(data);

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.artwork WHERE id = 1;
		const sql = `
				INSERT INTO
				${process.env.MYSQL_DATABASE}.${this.table}
				VALUE 
				(
					NULL,
					:name,
					:description,
					:price,
					:category_id
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
	public update = async (
		data: Partial<Artwork>,
	): Promise<Artwork | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.artwork WHERE id = 1;
		const sql = `
				UPDATE
				${process.env.MYSQL_DATABASE}.${this.table}
				SEt
				
					
				    ${this.table}.name = :name,
					${this.table}.price = :price,
					${this.table}.description =:description,
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
	public delete = async (
		data: Partial<Artwork>,
	): Promise<Artwork | unknown> => {
		// connexion au serveur MYSQL
		const connection = await new MySQLService().connect();

		// requéte SQL
		// SELECT role.* FROM madameqalam_dev.artwork WHERE id = 1;
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

export default ArtworkRepository;

// - TRansaction sql
// -- aller dans try
// -- creer un TRansaction

// -- connection.beginTransaction();

// -- executer la premiere requetes

// -- awit connection.execute(sql,data);

// -- executer la deuxiéme requetes  apres on change  le const a let

// -- sql = INSERT INTO
// -- ${process.env.MYSQL_DATABASE}.nom_de table
// -- VALUES(
// -- NULL?
// -- 64,
// -- 1),
// -- (NULL,
// -- 64,
// -- 2)

// -- en bas de const result

// -- on ecrit
// -- valider la transation lorsque l'ensemble de requetes ont reusi

// -- connection.commit();

// -- apres je viens dans le catch(error)
// -- annuler l'ensmble des requetes de la transation si l'une des requetes a ecchoué

// -- connection.rollback();
//
// pour créer une variable SQL stockant le derienier identifiant créé

// sql = '

//
//
//
