import artwork1 from '../../public/img/artwork1.jpg';
import styles from '../assets/css/artwork.module.css';

const ArtworkPage = () => {
    return (
        <section className={styles["artwork"]}>
            <div className={styles["art-container"]}>
                {/* text  */}
               
                <div className={styles["art-text"]}>
                    <h1>Oeuvres</h1>
                    <h2> Mugs Personnalisés en Calligraphie Arabe</h2>
                    <p>Cette image met en valeur une magnifique collection de mugs personnalisés illustrant des femmes célèbres, dont les portraits sont réalisés à partir de calligraphie arabe. Chaque dessin est composé des lettres de leur prénom et de leur nom, formant un style artistique unique qui allie typographie et illustration.

Les mugs, aux finitions soignées, sont disponibles en plusieurs modèles avec différentes couleurs d'anses et de contours, apportant une touche moderne et élégante.</p>
                </div>
                <div className={styles['art-image']}>
<img src={artwork1} alt="artwork1 de madame qalam" />
                </div>
            </div>
        
      
           


            </section>
    );
};

export default ArtworkPage;