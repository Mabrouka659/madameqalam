import { NextFunction, Request,Response} from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../model/user.js";
class AuthorizationMiddleware{
    // vérifier la validité du token  et le role de l'utilisateur 
    
    public check = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
        // console.log(roles);
        //récupérer le token contenu dans l'en tète Authorisation: Bearer <token>
        const token = req.headers.authorization?.split("Bearer ")[1];
        // console.log(token);
        // decoder le token 
        let tokenDecoded : JwtPayload;

        try {
            tokenDecoded = jwt.verify
                (token as string, process.env.JWT_KEY as string

                ) as JwtPayload;

            console.log(tokenDecoded);
        } catch (error) {
            res.status(401).json({
				status: 401,
				//afficher un simple message pour la production,sinon afficher l'erreur
                message:
                    process.env.NODE_ENV === "prod"
                        ? "Error"
                        : "Unauthorized - Invalid  token",
            });
            // bloquer la suite du script
            return
                }
        

//         // vérifier le role de l'utilisateur 
        if (roles.indexOf(tokenDecoded.user.role.name) === -1) {
            res.status(401).json({
            status: 401,
            //afficher un simple message pour la production,sinon afficher l'erreur
            message:
                process.env.NODE_ENV === "prod"
                    ? "Error"
                    : "Unauthorized - Role not allowed",
        });
            //bloque la suite du script 
            return
        }
        
//         //passer au middleware
        next();
    };

 }
export default AuthorizationMiddleware;