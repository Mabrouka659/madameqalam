import  type User from "../model/user";

class ConnectionAPI{

    // route de L'API
   
// enregistrement un utilisateur
    
public register= async(data: Partial<User>)=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/register`,{
        method:"POST",
        headers:{
            'Content-type':'application/json',
        },
body:JSON.stringify(data),
    });


const response = await fetch(request);
   


    //renvoyer les résultats de la réponse 
    return response.json();

};

////récupération un seul enregistrement 
    


}
export default ConnectionAPI;