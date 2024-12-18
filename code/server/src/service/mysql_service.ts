/*promise(promesse)
exécution d'un code asynchrone*/

import mysql, { type PoolConnection } from "mysql2/promise";

class MySQLService {
	// propriéte statique
    //*membres (proprétés et méthode ) statiques 
    //membres qui sont accessible non pas avec un objet mais directement par la classe
	private static connection: PoolConnection;

    public connect = async () =>{
        // tester si une connexion n'existe pas 
        /* await : à utiliser avec du code asynchrone (promesse)
                 créer un temps d'attente dans l'exécution du code 
                 récuperer le contenu d'une promesse  
        */
        if(!MySQLService.connection){

            MySQLService.connection=await mysql
            .createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                namedPlaceholders: true,
            })
            .getConnection();
        }
        // si la connexion  existe 
        return MySQLService.connection;
       
    };
}
export default MySQLService;
