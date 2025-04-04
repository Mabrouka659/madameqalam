class ArtworkAPI{

    // route de L'API
    private route = 'artwork' 
////récupération de tous les enregistrement 
    
public selectAll = async()=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`);
//exécuter la requéte 

const response = await fetch(request);
    //réquéperer la réponse 
   // const reponse = await request.json();


    //renvoyer les résultats de la réponse 
    return response.json();

};

////récupération un seul enregistrement 
    
public selectOne= async(id:number)=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}/${id}`,

    );
//exécuter la requéte 

const response = await fetch(request);
    //réquéperer la réponse 
   // const reponse = await request.json();


    //renvoyer les résultats de la réponse 
    return response.json();

};
////récupération de tous les enregistrement 
    
public insert = async(data: FormData, token: string)=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`,{
        method: 'POST',
        headers:{
            Authorization:`Bearer ${token}`,
        },
        body: data
    });
//exécuter la requéte 

const response = await fetch(request);
    //réquéperer la réponse 
   // const reponse = await request.json();


    //renvoyer les résultats de la réponse 
    return response.json();

};
public update = async(data: FormData, token:string)=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`,{
        method: 'PUT',
        headers:{
            Authorization: `Bearer ${token}`,
        },
        body: data
    });
//exécuter la requéte 

const response = await fetch(request);
    //réquéperer la réponse 
   // const reponse = await request.json();


    //renvoyer les résultats de la réponse 
    return response.json();

};

// supprimer un enregistement 

public delete = async(data: FormData, token:string)=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`,{
        method: 'DELETE',
        headers:{
            Authorization: `Bearer ${token}`,
        },
        body: data
    });
//exécuter la requéte 

const response = await fetch(request);
    //réquéperer la réponse 
   // const reponse = await request.json();


    //renvoyer les résultats de la réponse 
    return response.json();

};
}
export default ArtworkAPI;