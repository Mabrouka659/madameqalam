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


////récupération de tous les enregistrement 
    
public insert = async(data: FormData)=>{
    const request = new Request(`${import.meta.env.VITE_API_URL}/${this.route}`,{
        method: 'POST',
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