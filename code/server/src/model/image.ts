import type Artwork from "./artwork.js";

type Image = {
	id: number;
	name: string;
	artwork_id: number;
	artwork: Artwork;
};

export default Image;
