import { useForm } from "react-hook-form";
import ArtworkAPI from "../../../service/artwork_api";
import { useEffect, useState } from "react";
import CategorysAPI from "../../../service/category_api";
import { useNavigate, useParams } from "react-router-dom";
import type Category from "../../../model/category";
import type Artwork from "../../../model/artwork";

  /*
    handleSubmit permet de gérer la soumission du formulaire 
    register permet de référencer les champs de formulaire 
    errors permet de gérer les messages d'erreur
    reset permet de réinitilaiser /mettre à jour les données d'un formulaire
     >sur les cases à cocher , utiliser un array
    */
const AdminArtworkForm = () => {

  
    const { handleSubmit, register, formState: { errors },reset } = useForm<Artwork>();

    // 
    const [categories, setCategories] = useState<Category[]>();

    const navigate = useNavigate();
    //récupérer l'identifiant de l'URL

    const{ id } = useParams();
    // console.log(id);
   
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
           useEffect(() => {
        // exécuter en chaine des promesses
        Promise.allSettled([
            new CategorysAPI().selectAll(),
            new ArtworkAPI().selectOne(id as unknown as number),
        
        ]).then((responses) => {
            //  si la premiere promsse est tenu 
            if (responses[0].status === "fulfilled") {
                
                setCategories(responses[0].value.data);
                
            }
            //  si la deuxime promisse est tenu pour mettre le donne 
            if (responses[1].status === "fulfilled") {
                reset(responses[1].value.data)
              
            }
             //  si la troisiéme promisse est tenu  pour la table joint
            // if (responses[2].status === "fulfilled") {
            //     // mettre à jour 

            //     reset({
            //         ...responses[2].value.data,
            //        image_id responses[2].value.data.image_ids.split(","),
            //     });

                // console.log(responses[2].value.data);
            // }

        });
               // console.log(response);
    


}, [])
    /*  deux types de formulaire :
-sans ficher 
   la propriété body de la requéte HTTP peut être en JSON : JSON.stringify
   -dans la réquette HTTP, utiliser l'en-téte HTTP :Content-type : application/json 
   -avec ficher 
       -la propriété body de la requette HTTP doit ètre en "multipart/Form-data "

*/ 
    const onSubmitArtwork = async(values:Artwork)=>{
// créer un FormData en reprenant strictement le nom du champ
        const formData = new FormData();
        formData.append('id', values.id.toString());
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('image', values.image);
        formData.append('category_id', values.category_id.toString());

        //  console.log(values);
        
        // console.log(formData);

        const request = await new ArtworkAPI().update(formData);
        console.log(request);
        await new ArtworkAPI().insert(formData);
        console.log(request);
        // tester le code de statut HTTP
        if ([200, 201].indexOf(request.status) === -1) {
            //redirection
            navigate("/admin/artwork");
        }



};


    return(



        <form onSubmit={handleSubmit(onSubmitArtwork)}
        encType="multipart/form-data">
        <p>
                <label 
                htmlFor="name">name:</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}
                <input 
                type="text"
                     id="name"
                    {...register("name",{
                    required:"Name is required",
                    minLength:{
                        value:2,
                        message:"name is too short",

                },

                })}

                />
                <small>{ errors.name?.message}</small>
            </p>
             <p>
                <label htmlFor="description">description</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}
                <input
                    type="text"
                    // id="description"
                    {...register("description",{
                    required:"description is required",
                    minLength:{
                        value:5,
                        message:"description is too short",

                    },

                })}
                />
                <small>{ errors.description?.message}</small>
            </p>

            <p>
                <label htmlFor="price">price</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}
                <input
                    type="text"
                    // id="price"
                    {...register("price", {
                    required: "price is required",
                    min: {
                        value:2 ,
                        message: "price is too short",

                    },

                })}

                />
                <small > { errors.price?.message }</small>
            </p>

            <p>
                <label htmlFor="category_id">Category :</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}

                <select id="category_id"  {...register("category_id")}>
                    <option value="" />
                    {
                        categories?.map((category: Category) => {
                            return <option key={ Math.random() } value={ category.id } > { category.name } </option>
                        } )
                    }
                </select>
                <small > { errors.category_id?.message }</small>
            </p>

            <p> 
                {/* Laurant */}
                <label htmlFor="image">Image:</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}
                <input
                    type="file"
                    id="image"
                    {...register("image", id? {}: {
                    required: "image is required",

                })}

                />
                <small > { errors.image?.message }</small>
            </p>
            <p>
            <input type="hidden" {...register('id')} value={id} />
            <button type="submit">submit</button>
            </p>
        </form>
    )
};
export default AdminArtworkForm;