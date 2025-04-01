import { useForm } from "react-hook-form";
import type Contact from "../../../model/contact";


export const AdminContactForm = () => {

    /*
    handleSubmit permet de gérer la soumission du formulaire 
    register permet de référencer les champs de formulaire 
    errors permet de gérer les messages d'erreur 
    */
    const { handleSubmit, register, formState: { errors }, } = useForm<Contact>();

    // 
    const onsubmitArtwork = (values: Contact) => {

        console.log(values);
    };

    return (



        <form onSubmit={handleSubmit(onsubmitArtwork)}>


            <p>
                <label htmlFor="émail">émail</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}
                <input type="text"{...register("email", {
                    required: "email is required",
                    minLength: {
                        value: 2,
                        message: "email is too short",

                    },

                })}

                />
                <small > { errors.email?.message }</small>
            </p>

         

      
            <p>
                <label htmlFor="description ">description</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}
                <input type="text"{...register("description", {
                    required: "description is required",
                    minLength: {
                        value: 50,
                        message: "description is too short",

                    },

                })}

                />
                <small > { errors.description?.message }</small>
            </p>

           
            <p>
                <label htmlFor="message">message</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}
                <input type="text"{...register("message", {
                    required: "message is required",
                    min: {
                        value:5 ,
                        message: "message is too short",

                    },

                })}

                />
                <small > { errors.message?.message }</small>
            </p>

           <p>
                <button type="submit">  Valider</button>
            </p>
        </form>
    )
};
export default AdminContactForm;