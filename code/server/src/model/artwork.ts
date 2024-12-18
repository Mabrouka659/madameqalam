import type Category from "./category.js";
import type Orders from "./orders.js";
//reprendre STRICTEMENT le nom des colonnes SQL
type Artwork = {
	id: number;
	price: number;
	description: string;
	category_id: number;
	//composition permet de d'association la propriété d'un objet à un autre objet
	category: Category;
	orders_ids: string;
	orders: Orders[];
};

export default Artwork;
