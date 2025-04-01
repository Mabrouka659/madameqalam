import express, { type Request, type Response } from "express";
import SecurityRepository from "../repository/security_repository .js";
import argon2 from "argon2";
import UserRepository from "../repository/user_repository.js";
import type User from "../model/user.js";
import SimpleCrypto from "simple-crypto-js";
import jwt from "jsonwebtoken";
class SecurityController {
	//enregistre un utilisateur
public register  = async (req: Request, res: Response) => {
// 		// récuperer tous les enregistrements
const results = await new SecurityRepository().register({...req.body,

	password: await argon2.hash(req.body.password),

});
// 	...permet de cloner l'object
//   console.log(req.body);

		// si la requête SQL renvoie une erreur
		if (results instanceof Error) {
			res.status(400).json({
				status: 400,
				//afficher un simple message pour la production,sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : results,
			});

// process permet de rentrer dans l'environnement 
return;
		}
		/*status:code de statut HTTP 
		json:formater une réponse en JSON
		 */ 
			res.status(201).json({
				status: 201,
				message:"User created",
				 data : results,
			});
			//bloque la suite du script
			return;
		};



	
		// connexion d'un utilisateur
		public connection = async (req: Request, res: Response) => {
			// récuperer l'utilisateur par son email
	const results = await new UserRepository().selectOneByEmail(req.body.email);
	//...permet de cloner l'objet 
	// console.log(results);

	if (results instanceof Error) {
       res.status(400).json({
		status:400,
		//afficher un simple message pour la production ,sinon afficher l'erreur
		message: process.env.NODE_ENV ==="prod"? "Error": results,
	   });
// process permet de rentrer dans l'environement 
return;
	}
	
	// si l'utilisateur n'existe pas
	if (!results) {
		res.status(403).json({
			status: 403,
			// afficher un simple message pour la production, sinon afficher l'erreur
			message: process.env.NODE_ENV === "prod" ? "Error" : "User not exists",
		});
		// process permet de rentrer dans l'enironnement
		return;
	}

	// console.log(results);
	
		// récupérer l'utilisateur
		const user = await new UserRepository().selectOne(results);

		// console.log(user);

		// vérifier le mot de passe 
			const passwordVerify = await argon2.verify(
				(user as User).password, 
			req.body.password);
		if(!passwordVerify){
			res.status(403).json({
				status: 403,
				// afficher un simple message pour la production, sinon afficher l'erreur
				message: process.env.NODE_ENV === "prod" ? "Error" : "Mot de Passe incorrecte",
			});
			// pbloquer la suite du script
			return;
		}


			
			
			// cryter le mot de passe et génerer une carte aléatoire de la clé décryptage 


			const randomkey = SimpleCrypto.default.generateRandom();
			// console.log(randomkey);
			// clé de décryptage contenant la partie aléatoire et la partie fixe
			const key = `${process.env.KEY}${randomkey}`;

			//crypte le mot de passe 
			const crypto = new SimpleCrypto.default(key);
			const passwordEncrypted = crypto.encrypt(req.body.password);

			// console.log(key);

			console.log( passwordEncrypted);
	/*

		 status: code de statut HTTP 
		 json: formater une réponse en JSON 
	*/
	res.status(201).json({
		status: 201,
		message: "User connected",
		data:{... (user as User),password: passwordEncrypted,key: randomkey},
	});

};
// autorisation d'un utilisateur 
	
public auth = async (req: Request, res: Response) => {
	// récuperer l'utilisateur par son email
const results = await new UserRepository().selectOneByEmail(req.body.email);
//...permet de cloner l'objet 
// console.log(results);

if (results instanceof Error) {
res.status(400).json({
status:400,
//afficher un simple message pour la production ,sinon afficher l'erreur
message: process.env.NODE_ENV ==="prod"? "Error": results,
});
// process permet de rentrer dans l'environement 
return;
}

// si l'utilisateur n'existe pas
if (!results) {
res.status(403).json({
	status: 403,
	// afficher un simple message pour la production, sinon afficher l'erreur
	message: process.env.NODE_ENV === "prod" ? "Error" : "User not exists",
});
// process permet de rentrer dans l'enironnement
return;
}

// console.log(results);

// récupérer l'utilisateur
	const user = await new UserRepository().selectOne(results);
// recreer la clé de décryptage en décrytage en récupurent la partie variable de la clé et la clé fixe
	const key = `${process.env.KEY}${req.body.key}`;
	console.log(key);

	// décrypter le mot de passe 
	const crypto = new SimpleCrypto.default(key);
	let passwordDecrypted: string;
	try{

		passwordDecrypted = crypto.decrypt(req.body.password) as string;
		// console.log(passwordDecrypted);
}catch(error){res.status(401).json({
	status: 401,
	// afficher un simple message pour la production, sinon afficher l'erreur
	message: process.env.NODE_ENV === "prod" ? "Error" : "unauthorized",
});
	// bloque la suit de script
	return
	}
	
	
	
// console.log(user);

// vérifier le mot de passe 
const passwordVerify = await argon2.verify(
	(user as User).password,
	passwordDecrypted,
);
if(!passwordVerify){
	res.status(401).json({
		status: 401,
		// afficher un simple message pour la production, sinon afficher l'erreur
		message: process.env.NODE_ENV === "prod" ? "Error" : "Unauthorized",
	});
	// pbloquer la suite du script
	return;
}


	
	
	// cryter le mot de passe et génerer une carte aléatoire de la clé décryptage 


	// const randomkey = SimpleCrypto.default.generateRandom();
	// // console.log(randomkey);
	// // clé de décryptage contenant la partie aléatoire et la partie fixe
	// const key = `${process.env.KEY}${randomkey}`;

	// //crypte le mot de passe
	// const crypto = new SimpleCrypto.default(key);
	// const passwordEncrypted = crypto.encrypt(req.body.password);

	// // console.log(key);

	// console.log( passwordEncrypted);

	//générer le JSON web Token
	// en production, le tocken va expirer en 30 secondes, en développement /test,10 heures 
	const token = jwt.sign({ user: req.body }, process.env.JWT_KEY as string, {
		expiresIn:process.env.NODE_ENV === "prod" ?30: 60*60*10,
	});

	console.log(token);


/*

 status: code de statut HTTP 
 json: formater une réponse en JSON 
*/
	
	
	
res.status(200).json({
status: 201,
message: "User connected",
	data: {
	token:token,
} ,
});

};

}
export default SecurityController;
