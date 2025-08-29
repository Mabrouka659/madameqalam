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
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import OeuvresPage from "./page/OeuvresPage";
// import HomePage from "./page/HomePage";
// import BiographiePage from "./page/BiographiePage";
// import ContactPage from "./page/ContactPage";
// import Header from "./component/common/Header";
// import './assets/css/fonts.css';
import "./assets/css/reset.module.css";
import "./assets/css/style.module.css";
import "./assets/css/Contrast.css";
 import { RouterProvider } from "react-router-dom";
 import router from "./service/router";
import { UserProvider } from "./provider/UserProvider";
import ContrastToggle from "./component/common/ContrastToggle";


const App = () => {
  return (
    <UserProvider>
      <ContrastToggle/>
      <RouterProvider router={router} />
		</UserProvider>
    )
};


  // );
    



export default App;

 




