import { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import ArtworkRepository from "../repository/artwork_repository.js";
import Artwork from "../model/artwork.js";
import { start } from "node:repl";
class ArtworkfileMiddleware{
    
    public process = async (req: Request, res: Response, next: NextFunction) => {
         console.log(req.files);
         console.log(req.body);
        
        // récuperer le ficher transfére
        const file = (req.files as Express.Multer.File[])[0];
        //si un fichier a été sélectionné 
        // récupérer l'enregistrement par son id 
    
          
        const artwork: Artwork | unknown = await new ArtworkRepository().selectOne(req.body)
        if (file) {
                 //ajouter une extension au nom du fichier  
        const filename = `${file.filename}.${file.mimetype.split("/")[1]}`;


        //renommer le ficher transfére
    
          await fs.rename(file.path, `${file.destination}/${filename}`);
    console.log(filename);
    
    
    //   remplir la propriete de body en relation avec le ficher 
    req.body[file.filename] = filename
    
    
            console.log(filename);
            //récuperer la méthode HTTP
            // si une modification est effectuée, supprimer l'ancien fichier 
            
            if (req.method === 'PUT') {

                await fs.rm(
                    `${file.destination}/${(artwork as Artwork)}[${ file.fieldname }]}`,
            );
    
}

            
        }
        //si aucune ficher n'a éte sélectionné
        else {  
            // PUT > récupérer le nom de l'ancienne image et l'affecter à la propriété gérant le fichier
            if(req.method === 'PUT'){    
                req.body.image = (artwork as Artwork).image;

            }

            // DELETE > supprimer le fichier 
            if(req.method === 'DELETE'){

                await fs.rm(`${process.env.ASSET_DIR}/img/${(artwork as Artwork).image}`);
            }

        }
        

        


         




        // //passer au middleware suivant 
        next();
    }






}
export default ArtworkfileMiddleware;