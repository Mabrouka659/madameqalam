import type Category from "./category";
import type Image from "./image";

//reprendre STRICTEMENT le nom des colonnes SQL
type Artwork = {
	id: number;
	name: string;
	description: string;
	price: number;
	image: Image[];
	category_id: number;
	//composition permet de d'association la propriété d'un objet à un autre objet
	category: Category;
};

export default Artwork;
