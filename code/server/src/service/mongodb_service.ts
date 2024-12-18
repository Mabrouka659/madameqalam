import { MongoClient } from "mongodb";

class MongoDBSevice {

 //connexion au serveur MongoDB
  public connect = () => {
   // URL de connexion: mongodb://<user>:<password>@<host>:<port>/?authSource=admin
    const connection = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/?authSource=admin`;
    //connexion au service 
    const client = new MongoClient(connection);
    //sellectioner la base de données 
    return client.db(process.env.MONGODB_DATABASE);


  };


}
export default MongoDBSevice;