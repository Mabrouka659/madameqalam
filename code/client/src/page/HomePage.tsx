
import styles from '../assets/css/home.module.css'
import Notice from '../component/common/Notice';
const HomePage = () => {

	
	return (

		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
<section className={styles["home"] }>
			<div className={styles["home-container"]}>
				<div className={styles['home-text']}>
				
				<h1>Madame Qalam</h1>
				
				<Notice />
				
				</div>

				<div>
					<img src="" alt="" />
				</div>
		</div>
			

	</section>
	
	);
};

export default HomePage;

// const HomePage = () => {
// 	return (
// 		<div className="container ">
// 			<h1>Home</h1>
// 			<section>
// 				<Video />
// 			</section>
// 			<Biographie />
			
// 		</div>

// 	);
// };
// export default HomePage;



		// <div className="container ">
		// {/* // 			<h1>Home</h1>
		// 			<section>
		// 				<Video />
		// 			</section>
		// 			<Biographie />
					
		// 		</div> */}
   
    
