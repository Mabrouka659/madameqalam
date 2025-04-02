import profileImage from "../../public/img/profileImage.jpg";
import styles from "../assets/css/biographie.module.css";

const BiographiePage = () => {
	return (
		<section className={styles.Biographie}>
			<div className={styles["bio-container"]}>
				<div className={styles["bio-text"]}>
					
				<h1 className={styles.title}>Biographie</h1>
					<h2> Un parcours entre tradition et modernité</h2>
					<p>
						D’origine arabophone, la calligraphie fait partie de l’identité
						culturelle et artistique de Madame Qalam. Passionnée par les arts
						visuels, elle a obtenu un diplôme en calligraphie ainsi qu’un
						diplôme en arts plastiques, lui permettant d’explorer et de
						fusionner ces disciplines pour créer des œuvres uniques.
					</p>
					<h3>La calligraphie comme expression artistique</h3>
					<p>
						Grâce à ces deux formations, Madame Qalam a développé un style
						personnel mêlant calligraphie traditionnelle et approches modernes.
						Son travail s’inspire des lettres arabes et de leur fluidité pour
						composer des créations artistiques riches en sens et en esthétisme.
					</p>
					<h4>Une expérience avec tous les publics</h4>
					<p>
						Au fil des années, Madame Qalam a animé des ateliers pour tous les
						âges : Enfants : initiation ludique à la calligraphie à travers le
						dessin et la couleur. Adultes et seniors : exploration des styles
						calligraphiques et techniques avancées. Événements culturels :
						participation et animation d’ateliers en collaboration avec des
						mairies et associations pour promouvoir l’art de la calligraphie.
					</p>

					<h5>Transmission et engagement</h5>
					<p>
						L’objectif de Madame Qalam est de transmettre cette passion, de
						permettre à chacun d’exprimer sa créativité à travers l’art des
						lettres et de continuer à faire évoluer la calligraphie en mêlant
						tradition et modernité.
					</p>
					
<button className={styles.contactBtn}>Contact</button>
					
				</div>

				<div className={styles["bio-image"]}>
					<img src={profileImage} alt="Portrait de Madame Qalam" />
				</div>

			</div>

    
		</section>
	);
};

export default BiographiePage;
