import styles from '../assets/css/home.module.css';
import Notice from '../component/common/Notice';

const HomePage = () => {
  return (
    <section className={styles.home}>
      <div className={styles.homeContainer}>
        {/* Utiliser directement le composant Notice */}
        <Notice />
        
        <div className={styles.bioSection}>
          <div className={styles.bioText}>
            <h2>Biographie</h2>
            <p>
              Madame Qalam est une artiste calligraphe passionnée par la beauté des lettres
              et la poésie du geste. <br />
              Elle crée des œuvres uniques mêlant tradition et modernité, sur différents supports..
            </p>
            <button className={styles.contactBtn} type='button'>Contact</button>
          </div>
          <div className={styles.bioImage}>
            <img src="/img/profileImage.jpg" alt="Portrait" />
          </div>
        </div>

        <div className={styles.artworkSection}>
          <div className={styles.artworkImage}>
            <img src="/img/3chek.jpg" alt="Oeuvre calligraphique" />
          </div>
          <div className={styles.artworkText}>
            <p>
              Cette œuvre est réalisée en calligraphie arabe artistique, mettant en valeur
              le texte avec une éclatante couleur rouge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;