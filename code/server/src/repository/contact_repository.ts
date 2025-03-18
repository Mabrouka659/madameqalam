import MongoDBSevice from "../service/mongodb_service.js";

class ContactRepository {
	// nom de la collection
	private collection = "contact";

	// récupérer tous les documents
	public selectAll = () => {
		//connexion au serveur MongoDB
		const connection = new MongoDBSevice().connect();
		// console.log(connection);

		//sélection la collection
		const collection = connection.collection(this.collection);
		// console.log(collection);
		// récuperer les documents
		return collection.find().toArray();
	};
}

export default ContactRepository;
