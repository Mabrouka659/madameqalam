import Joi from "joi";
import User from "../model/user.js"

class RegisterFormValidator{
    //  un validateur renvoie la validation de la saisie 
    // value réprésente la saisie du formulaire 
    public isValid = async (values: Partial<User>) => {
        // contraintes de validation 
        const constraints = Joi.object({
            firstname: Joi.string().alphanum().required(),
            lastname: Joi.string().alphanum().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
           password: Joi.string().required(),

        
         

        });
        try {
    // comparer la saisie avec les contraintes de validation 
    return await constraints.validateAsync(values);
} catch (error) {
            return error;
}


    };
    public inValid = async (values: Partial<User>) => {
        // contraintes de validation 
        const constraints = Joi.object({
            firstname: Joi.string().alphanum().required(),
            lastname: Joi.string().alphanum().required(),
            phone: Joi.string()
            .length(15)
            .pattern(/^[0-9]+$/)
            .required,
            email: Joi.string().email().required(),
           password: Joi.string().required(),
        });
        try {
    // comparer la saisie avec les contraintes de validation 
    return await constraints.validateAsync(values);
} catch (error) {
            return error;
}


    };
}
export default RegisterFormValidator;