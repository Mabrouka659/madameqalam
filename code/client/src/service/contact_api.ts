class ContactAPI{
    ////récupération de tous les enregistrement 
        
    public selectAll = async()=>{
        const request = new Request(`${import.meta.env.VITE_API_URL}/contact`);
    //exécuter la requéte 
    
    const response = await fetch(request);
        //réquéperer la réponse 
       // const reponse = await request.json();
    
    
        //renvoyer les résultats de la réponse 
        return response.json();
    
    };
    }
    export default ContactAPI;