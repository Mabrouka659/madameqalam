import { ObjectId, WithId, Document } from "mongodb";

import MongoDBSevice from "../service/mongodb_service.js";
import type Contact from "../model/contact.js";

class ContactRepository {
	// nom de la collection
	private collection = "contact";

	// récupérer tous les documents
	public selectAll = async (): Promise<WithId<Document>[]> => {
		//connexion au serveur MongoDB
		const connection = new MongoDBSevice().connect();
		// console.log(connection);

		//sélection la collection "contact"
		const collection = connection.collection(this.collection);
		// console.log(collection);
		// récuperer les documents
		return collection.find().toArray();
	};

	// Lire un contact par ID (comme SELECT* FROM contact WHERE id = ?)

	public findByID = async (
		contactDAta: Partial<Contact>,
	): Promise<WithId<Document> | null> => {
		
		const connect = new MongoDBSevice().connect();
		try {
			const collect = connect.collection(this.collection);
			// on cherche un contact avec cet _id 
			const contact = await collect.findOne({
				_id: new ObjectId(contactDAta._id)  //On convertit en ObjectId
			});
			return contact;
		} catch (error) {
			console.error("Erreur lors de la recherche du contact :", error);
			return null;
		}


	};

	// Créer un nouveau contact (comme INSERT INTO contact )
	public insert = async (
		contactData: Omit<Contact, '_id'> //On enlève _id car MongoDB le génère automatiquement 
	): Promise<any> => {
		const db = new MongoDBSevice().connect();
		try {
			const result = await db.collection(this.collection).insertOne({
				email: contactData.email,
				subject: contactData.subject,
				message: contactData.message,
				createdAt: new Date(), // On ajoute la date de création
			});
			
			return result;
		} catch (error) {
			console.error("Erreur lors de la création du contact :", error);
			throw error;
		}

		
	};

	// ✏️ MODIFIER UN CONTACT (comme UPDATE contact SET ... WHERE id = ?)
	public update = async (
		contactData: Partial<Contact>,
	): Promise<any> => {
		const db = new MongoDBSevice().connect();
		
		try {
			const result = await db.collection(this.collection).updateOne(
				{ _id: new ObjectId(contactData._id) }, // Condition : quel contact modifier
				{ 
					$set: { // $set dit à MongoDB : "change ces valeurs"
						email: contactData.email,
						subject: contactData.subject,
						message: contactData.message,
						updatedAt: new Date(), // On ajoute la date de modification
					}
				}
			);
			
			return result;
		} catch (error) {
			console.error("Erreur lors de la modification du contact :", error);
			throw error;
		}
	};

	// 🗑️ SUPPRIMER UN CONTACT (comme DELETE FROM contact WHERE id = ?)
	public delete = async (
		contactData: Partial<Contact>,
	): Promise<any> => {
		const db = new MongoDBSevice().connect();
		
		try {
			const result = await db.collection(this.collection).deleteOne({
				_id: new ObjectId(contactData._id), // On trouve le contact à supprimer
			});
			
			return result;
		} catch (error) {
			console.error("Erreur lors de la suppression du contact :", error);
			throw error;
		}
	};
}

export default ContactRepository;
