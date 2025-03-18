import User from "./user";
import Workshop from "./workshop";

//reprendre STRICTEMENT le nom des colonnes SQL
type Booking= {
	id: number;
	datetime: string;
	address: string ;
	user_id: number;
	user:User;
	workshop_id: number;
	workshop:Workshop;
	//composition permet de d'association la propriété d'un objet à un autre objet
	
};

export default Booking;