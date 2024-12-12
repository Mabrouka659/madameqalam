import { useEffect, useState } from "react";
import roleAPI from "../../service/role_api";
import type Role from "../../model/role";

const RoleList = () => {
	//état pour stocker les résultats de la requête HTTP
	const [role, setrole] = useState<Role[]>([]);

	/*
useEffect permet de déclencher des instructions à un moment de vie d'un composant 
-affiché 
-mise à jour avec un état 
-désaffiché

*/
	useEffect(() => {
		//récuperer tous les enregistrement
		//then permet de récuperer les données d'une promesse l'orsque la fonction n'est pas asynchrone
		new roleAPI().selectAll().then((results) => setrole(results.data));
	}, []);
	return (
		<>
			coucou
			{/* map est la seule boucle disponible dans le HTML de react */}
			{/* les accolades dans le HTML permettent de séparer la partie HTML de la partie JS 
			
			une propriéte key,contenant une valeur unique , est obligatoire lorsqu'une boucle est crée*/}
			{role.map((results) => (
				<p key={Math.random()}> {results.name}</p>
			))}
		</>
	);
};

export default RoleList;
