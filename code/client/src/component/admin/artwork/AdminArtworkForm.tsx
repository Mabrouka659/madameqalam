import { useForm } from "react-hook-form";
import Artwork from "../../../model/artwork";
import ArtworkAPI from "../../../service/artwork_api";
import { useEffect, useState } from "react";
import Category from "../../../model/category";
import CategorysAPI from "../../../service/category_api";

  /*
    handleSubmit permet de gérer la soumission du formulaire 
    register permet de référencer les champs de formulaire 
    errors permet de gérer les messages d'erreur 
    */
const AdminArtworkForm = () => {

  
    const { handleSubmit, register, formState: { errors }, } = useForm<Artwork>();

    // 
    const [categories, setCategories] = useState<Category[]>();
   
    useEffect(() => {
        // exécuter en chaine des promesses
        Promise.allSettled([
            new CategorysAPI().selectAll()
        ]).then((responses) => {
            //  si la premiere promsse est tenu 
            if (responses[0].status === "fulfilled") {
                
                setCategories(responses[0].value.data);
                console.log(responses[0].value.data);
            }
        });
               // console.log(response);
    


}, []);
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
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('image', values.image);
        formData.append('category_id', values.category_id.toString());

        //  console.log(values);
        
        // console.log(formData);

        const request = await new ArtworkAPI().insert(formData);
        console.log(request);

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
                
                {/* <select id="category_id"
                    {...register("category_id", {
                    required: "category is required")}, 
                    
                    }
                    >
                    

<option value=""/> {
                    categorys?.map((category:Category) =>{
return(
<option key={Math.random()}  value={category.id}>
        {category.name}
        

</option>

);

 })
}



</select> */}





                {/* <input
                    type="text"
                    // id="category_id"
                    {...register("category_id", {
                    required: "category is required",

                })}

                /> */}
                <small > { errors.category_id?.message }</small>
            </p>

            <p> 
                {/* Laurant */}
                <label htmlFor="image">Image :</label>
                {/* rependre STRICTEMENT le nom des colonnes SQL */}
                <input type="file"
                    // id="image"
                    {...register("image", {
                    required: "image is required",

                })}

                />
                <small > { errors.image?.message }</small>
            </p>
            
            <p>
                <button type="submit">  Valider</button>
            </p>
        </form>
    )
};
export default AdminArtworkForm;