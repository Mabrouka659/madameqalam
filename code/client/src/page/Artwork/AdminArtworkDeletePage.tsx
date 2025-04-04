import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArtworkAPI from "../../service/artwork_api";
import SecurityAPI from "../../service/security_api";
import { UserContext } from "../../provider/UserProvider";

export const AdminArtworkDeletePage = () => {
	// récupérer L'id dans L'URL
	const { id } = useParams();
	// navigation
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	useEffect(() => {
		//céer un eformaData
		const formData = new FormData();
		formData.append("id", id as unknown as string);
		new SecurityAPI().auth(user).then(async (authResponse) => {
			// console.log(authResponse.data.token);
			await new ArtworkAPI()
				.delete(formData, authResponse.data.token)
				.then(() => {
					// message en session
					window.sessionStorage.setItem("notice", "Artwork deleted");
				});
			//redirection
			navigate("/admin/artwork");
		});
	}, [id, navigate, user]);

	return <></>;
};

export default AdminArtworkDeletePage;
