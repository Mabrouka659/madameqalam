import type Artwork from "./artwork";

//reprendre STRICTEMENT le nom des colonnes SQL
type Image = {
	id: number;
	name: string;
	artwork_id: number;
	artwork: Artwork;
	//composition permet de d'association la propriété d'un objet à un autre objet
};

export default Image;
