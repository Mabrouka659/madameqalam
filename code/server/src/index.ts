import Server from "./core/server.js";

// console.log('coucou');
//démarrer le server 
const server: Server = new Server();

//process.env permet d'accéder aux variables d'environnement 
server.create().listen(process.env.PORT);