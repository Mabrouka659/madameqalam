
import styles from "../assets/css/artwork.module.css";
import generalStyles from "../assets/css/style.module.css";
const droitdefemmes = "/img/droit-de-femmes.jpg";
const Trouse = "/img/Trouse.jpg";
const gourde = "/img/adelgourde.png";
const portrait = "/img/adadportrait.jpg";
const gourde2 = "/img/rosaparksgourde.jpg";
const portrait2 = "/img/djamilaportrait.jpg";


import { Helmet } from "react-helmet";
import { useState } from "react";
const ArtworkPage = () => {
  // etat pour gérer la visibilité des images de la galerie 
  const [galleryItems, setGalleryItems] = useState([
    { id: 1, src: gourde, alt: "Gourde calligraphie Adel", visible: true },
    { id: 2, src: portrait, alt: "portrait Calligraphie Adel", visible: true },
    { id: 3, src: gourde2, alt: "Gourde calligraphie Rose Parks", visible: true },
    { id: 4, src: portrait2, alt: "Portrait Calligraphie Djamila", visible: true}

  ])
  // fonction pour supprimer un élément de la galerie

  const handleDelete = (itemId: number) => {
    console.log("Suppression de l'item:", itemId)
    setGalleryItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? {...item, visible: false}: item
      )

    );
  };

  return (
    <>
      <Helmet>
        <title>Œuvres - Madame Qalam</title>
      
        <meta
          name="description"
          content="Découvrez les oeuvres uniques de Madame Qalam : mugs,trousses et portraits en calligraphie arabe."
        />
      </Helmet>
    <section className={generalStyles.artworkSection}>
      <h1 className={generalStyles.mainTitle}>Madame Qalam</h1>
      
      <div className={styles.artContainer}>
        <div className={styles.artContent}>
          <h2 className={styles.artTitle}>Mugs Personnalisés en Calligraphie Arabe</h2>
          <div className={styles.artText}>
            <p>
              Cette image met en valeur une magnifique collection de mugs
              personnalisés illustrant des femmes célèbres, dont les portraits
              sont réalisés à partir de calligraphie arabe. Chaque dessin est
              composé des lettres de leur prénom et de leur nom, formant un style
              artistique unique qui allie typographie et illustration. Les mugs,
              aux finitions soignées, sont disponibles en plusieurs modèles avec
              différentes couleurs d'anses et de contours, apportant une touche
              moderne et élégante.
            </p>
          </div>
        </div>
        <div className={styles.artImageWrapper}>
          <img 
            src={droitdefemmes} 
            alt="Artwork de mugs calligraphiés par Madame Qalam" 
            className={styles.artImage}
          />
        </div>
      </div>

      <div className={`${styles.artContainer} ${styles.reverse}`}>
        <div className={styles.artContent}>
          <h2 className={styles.artTitle}>Trousse Personnalisée en Calligraphie Arabe</h2>
          <div className={styles.artText}>
            <p>
              Cette trousse élégante est ornée de calligraphie arabe artistique, 
              mettant en valeur un style raffiné et personnalisé. Elle est idéale 
              pour les étudiants, artistes ou amateurs d'art oriental souhaitant 
              allier utilité et esthétisme. Chaque trousse peut être décorée selon 
              le prénom de son propriétaire, transformant l'objet du quotidien en 
              œuvre unique.
            </p>
          </div>
        </div>
        <div className={styles.artImageWrapper}>
          <img 
            src={Trouse} 
            alt="Trousse calligraphiée de Madame Qalam" 
            className={styles.artImage}
          />
        </div>
      </div>
      {/* section avec 4 images alignées */}
      <h2 className={styles.galleryTitle}> Galerie d'oeuvre</h2>
      <div className={styles.imageGallery}>
        {galleryItems
          .filter(item => item.visible)
          .map(item => (
            <div
              key={item.id}
              className={`${styles.galleryItem} gallery-item-with-delete`}
              >
              
              <img src={item.src}
                alt={item.alt}
              />
              
              <button
                onClick={() => handleDelete(item.id)}
                aria-label={`supprimer  ${item.alt}`}
                className="gallery-delete-btn"

            
              >
                ×
              </button>
            </div>
          ))
        }
      </div>

      
      </section>
      <style>{`
        .gallery-delete-btn {
        position: relative! important;}

        .gallery-delete-btn{
        position: absolute ! important;
        top: 10px ! important ;
        right: 10px ! important ;
        backgroud : rgba(255,0,0,0.8)!important;
        color: white !important;
        border: none !important;
        border-radius: 50 ! important;
        width: 30px ! important;
        height: 30px ! important;
        font-size: 18px !important;
        font-weight: bold !important;
        cursor: pointer !important;
        z-index: 999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        opacity: 0 !important;
        transition: all 0.3s ease !important;
        
        
        }
        .gallery-item-with-delete:hover .gallery-delete-btn{
        opacity:1 !important;}

        .gallery-delete-btn:hover{
          background: rgba(220, 20, 20 ,1) !important;
          transform: scale(1.1)!important;}

          .gallery-delete-btn:active{
          transform : scale(0.95) !important;}

          /*Responsive pour mobile*/ 
          @media (max-width: 480px){
          .gallery-delete-btn{
          width: 25px !important;
          height: 25px !important;
          font-siize: 16px !important;
          top: 8px !important;
          right: 8px !important
          
          
          }}

     ` }
      </style>
      </>
      
  );
};

export default ArtworkPage;
 