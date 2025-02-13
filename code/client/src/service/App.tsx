/*
composant react:
 capitaliser le nom du composant
 fonction  exportée JS/TS qui renvoie du HTML
le nom du composant devient une balise
*/

// import './assets/css/reset.css';
// import './assets/css/style.css';
// import React from "react"; 


// import { RouterProvider } from "react-router-dom";
import "./assets/css/reset.css";
import "./assets/css/style.css";

import router from "./router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
 




