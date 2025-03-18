import type { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";
import ArtworkRepository from "../repository/artwork_repository.js";
import type Artwork from "../model/artwork.js";

class ArtworkfileMiddleware{

    public process = async (req: Request, res: Response, next: NextFunction) => {
        //  console.log(req.files);
        //  console.log(req.body);

        // récuperer le ficher transfére
        // const file = (req.files as Express.Multer.File[])[0];
        //si un fichier a été sélectionné
        // récupérer l'enregistrement par son id

        const artwork: Artwork | unknown = await new ArtworkRepository().selectOne(req.body);

        const image_list = [];

        if ((req.files as Express.Multer.File[]).length > 0) {
            for (let i = 0; i < (req.files as Express.Multer.File[]).length; i++){
                const file = (req.files as Express.Multer.File[])[i];

                 //ajouter une extension au nom du fichier
                const filename = `${file.filename}.${file.mimetype.split("/")[1]}`;

                //renommer le ficher transfére
                await fs.rename(file.path, `${file.destination}/${filename}`);

                image_list.push(filename);
                req.body[file.fieldname] = image_list;

                if (req.method === "PUT") {
                    // console.log(artwork);

                }
            }
}

        //si aucune ficher n'a éte sélectionné
        else {
            // PUT > récupérer le nom de l'ancienne image et l'affecter à la propriété gérant le fichier
            if(req.method === "PUT"){
                req.body.image = (artwork as Artwork).image;

            }

            // DELETE > supprimer le fichier
            if(req.method === 'DELETE'){

                await fs.rm(`${process.env.ASSET_DIR}/img/${(artwork as Artwork).image[0].name}`);
            }

        }

        // //passer au middleware suivant
        next();
    }
}
export default ArtworkfileMiddleware;

// import type { NextFunction, Request, Response } from "express";
// import fs from "node:fs/promises";
// import ArtworkRepository from "../repository/artwork_repository.js";
// import type Artwork from "../model/artwork.js";

// class ArtworkfileMiddleware {
// 	public process = async (req: Request, res: Response, next: NextFunction) => {
// 		// Vérification de l'existence de fichiers dans la requête
// 		const files = req.files as Express.Multer.File[] | undefined;

// 		// Si des fichiers sont envoyés
// 		if (files && files.length > 0) {
// 			const image_list: string[] = [];

// 			// Traitement de chaque fichier
// 			for (let i = 0; i < files.length; i++) {
// 				const file = files[i];

// 				// Renommer le fichier et ajouter son extension
// 				const filename = `${file.filename}.${file.mimetype.split("/")[1]}`;
// 				await fs.rename(file.path, `${file.destination}/${filename}`);

// 				// Ajouter le nom du fichier à la liste d'images
// 				image_list.push(filename);
// 			}

// 			// Mettre à jour le corps de la requête avec les noms des images
// 			req.body.image = image_list;
// 		} else {
// 			// Si aucun fichier n'est envoyé, gérer les autres cas
// 			const artwork: Artwork | unknown =
// 				await new ArtworkRepository().selectOne(req.body);

// 			// Si la méthode est PUT (mise à jour), affecter l'ancienne image
// 			if (req.method === "PUT") {
// 				req.body.image = (artwork as Artwork).image;
// 			}

// 			// Si la méthode est DELETE (suppression), supprimer l'image
// 			if (req.method === "DELETE") {
// 				// Vérifiez que l'artwork existe avant de tenter de supprimer l'image
// 				if ((artwork as Artwork).image) {
// 					await fs.rm(
// 						`${process.env.ASSET_DIR}/img/${(artwork as Artwork).image}`,
// 					);
// 				}
// 			}
// 		}

// 		// Passer au middleware suivant
// 		next();
// 	};
// }

// export default ArtworkfileMiddleware;
