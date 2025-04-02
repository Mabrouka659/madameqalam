import type { NextFunction, Request, Response } from "express";
import RegisterFormValidator from "../validator/register_from_validator.js";


class RegisterFormValidatorMiddleware {
    public validate = (req: Request, res: Response, next: NextFunction) => {

        // envoyer la saisie au validateur 
        const isValid = new RegisterFormValidator().isValid(req.body);
        // console.log(isValid);
        
        // si une erreur de valideation est renvoye 
        if (isValid instanceof Error) {
            res.status(400).json({
                status: 400,
                // afficher un simple message pour la production, sinon afficher l'erreur
                message: process.env.NODE_ENV === "prod" ? "Error" : isValid,
                
            })
            // bloquer la suite du script
            return;
        }
        // passer le middleware suivant 
            
    };
}

export default RegisterFormValidatorMiddleware;