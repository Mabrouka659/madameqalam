import styles from "../assets/css/ateliers.module.css";

const AteliersPage = () => {
  return (
    <section className={styles.ateliers}>
      <div className={styles.container}>
        <h2 className={styles.title}>Madame Qalam</h2>

        <div className={styles.block} >
          <img src="/img/JO2024.jpg" alt="Atelier enfants JO" />
          <p>
            Cette image a été réalisée lors d’un atelier de calligraphie arabe artistique avec des enfants, dans une ambiance créative et joyeuse.
            <br />
            L’œuvre représente un dessin formé à partir de lettres arabes, conçu à l’occasion des Jeux Olympiques 2024, célébrant l’art et le sport.
          </p>
        </div>

        <div className={styles.block}>
          <img src="/img/droit de femmes.jpg" alt="Journée de droits de femmes" />
          <p>
            Cette photo a été prise lors de la Journée des droits des femmes 2024, pendant un atelier de calligraphie animé dans une maison de quartier.
            <br />
            L’activité a réuni des femmes de tous horizons autour d’un moment de partage et de création artistique.
            <br />
            On y voit en arrière-plan des portraits de femmes célèbres du monde entier, mis à l’honneur pour l’occasion.
          </p>
        </div>

        <div className={styles.block }>
          <img src="/img/3chek.jpg" alt="Œuvre amour" />
          <p>
            Cette œuvre a été réalisée lors d’un atelier de calligraphie arabe artistique avec des adultes, dans une maison de quartier.
            <br />
            Le moment a permis aux participants d’exprimer leurs émotions à travers l’art des lettres.
            <br />
            L’œuvre représente le mot "amour", symbole universel de lien, de beauté et de partage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AteliersPage;
