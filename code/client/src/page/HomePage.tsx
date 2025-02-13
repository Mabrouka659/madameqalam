// const HomePage = () => {
// 	// /*Fragment: balise anonyme <>/<>*/
// 	return (
// 		<>

import Biographie from "../component/home/Biographie";

import Video from "../component/home/Video";

//         <h1>Home</h1>

// 		</>
// 	);
// };

// export default HomePage;

const HomePage = () => {
	return (
		<div className="container ">
			<h1>Home</h1>
			<section>
				<Video />
			</section>
			<Biographie />
			
		</div>

	);
};
export default HomePage;
