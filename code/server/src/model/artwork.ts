import type Category from "./category.js";
//reprendre STRICTEMENT le nom des colonnes SQL
type Artwork = {
	id: number;
	price: number;
	description: string;
    category_id: number;
	//composition permet de d'association 
	category: Category;
};

export default Artwork;
