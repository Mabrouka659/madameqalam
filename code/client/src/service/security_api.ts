import  type User from "../model/user";

class SecurityAPI{
delete(formData: FormData, token: any) {
	throw new Error("Method not implemented.");
}

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
	

public connection= async(data: Partial<User>)=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/login`,{
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


    //aotorisier un utilisateur 
public auth= async(data: Partial<User>)=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/auth`,{
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

}
export default SecurityAPI;