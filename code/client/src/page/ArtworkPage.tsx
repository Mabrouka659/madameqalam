import artwork1 from "../../public/img/artwork1.jpg";
import styles from "../assets/css/artwork.module.css";
import Trouse from "../../public/img/Trouse.jpg";
import generalStyles from "../assets/css/style.module.css"
const ArtworkPage = () => {
  return (
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
            src={artwork1} 
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
    </section>
  );
};

export default ArtworkPage;
 