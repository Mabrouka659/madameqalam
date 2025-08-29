import { useEffect, useState } from "react";

const ContrastToggle = () => {
    const [contrast, setContrast] = useState(
        localStorage.getItem("contrast") === "true"
    );
    useEffect(
        () => {
            
            if (contrast) {
                document.body.classList.add("contrast");
                 console.log("✅ Contraste activé");
            } else {
                document.body.classList.remove("contrast");
                  console.log("❌ Contraste désactivé");
            }

            localStorage.setItem("contrast", contrast.toString());
        },
        [contrast]);
    return (
        <button onClick={() => {
            console.log( " 🎯 Bouton contraste cliqué!");
            setContrast((prev) => !prev);
        }}
            style={{
                position: 'fixed',
                top: 10,
                right: 10,
                zIndex: 9999,
                
            }}
        >
            
            {contrast ? "Désactiver le contraste" : "Activer le contraste"}
        </button>
    );


};
export default ContrastToggle;