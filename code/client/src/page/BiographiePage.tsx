import profileImage from "../../public/img/profileImage.jpg";
import styles from "../assets/css/biographie.module.css";
import { Link } from "react-router-dom";

const BiographiePage = () => {
  return (
    <section className={styles.biographie}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h1 className={styles.mainTitle}>Biographie</h1>
            
            <article className={styles.bioContent}>
              <h2 className={styles.sectionTitle}>Un parcours entre tradition et modernité</h2>
              <p className={styles.paragraph}>
                D'origine arabophone, la calligraphie fait partie de l'identité
                culturelle et artistique de Madame Qalam. Passionnée par les arts
                visuels, elle a obtenu un diplôme en calligraphie ainsi qu'un
                diplôme en arts plastiques, lui permettant d'explorer et de
                fusionner ces disciplines pour créer des œuvres uniques.
              </p>
              
              <h3 className={styles.subsectionTitle}>La calligraphie comme expression artistique</h3>
              <p className={styles.paragraph}>
                Grâce à ces deux formations, Madame Qalam a développé un style
                personnel mêlant calligraphie traditionnelle et approches modernes.
                Son travail s'inspire des lettres arabes et de leur fluidité pour
                composer des créations artistiques riches en sens et en esthétisme.
              </p>
              
              <h4 className={styles.subsectionTitle}>Une expérience avec tous les publics</h4>
              <p className={styles.paragraph}>
                Au fil des années, Madame Qalam a animé des ateliers pour tous les
                âges :
                <ul className={styles.experienceList}>
                  <li>Enfants : initiation ludique à la calligraphie à travers le dessin et la couleur.</li>
                  <li>Adultes et seniors : exploration des styles calligraphiques et techniques avancées.</li>
                  <li>Événements culturels : participation et animation d'ateliers en collaboration avec des
                    mairies et associations pour promouvoir l'art de la calligraphie.</li>
                </ul>
              </p>

              <h5 className={styles.subsectionTitle}>Transmission et engagement</h5>
              <p className={styles.paragraph}>
                L'objectif de Madame Qalam est de transmettre cette passion, de
                permettre à chacun d'exprimer sa créativité à travers l'art des
                lettres et de continuer à faire évoluer la calligraphie en mêlant
                tradition et modernité.
              </p>
            </article>
            
            <Link to="/contact" className={styles.contactBtn}>Contact</Link>
          </div>

          <div className={styles.imageSection}>
            <img 
              src={profileImage} 
              alt="Portrait de Madame Qalam" 
              className={styles.profileImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographiePage;
