import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArtworkAPI from "../../service/artwork_api";

export const AdminArtworkDeletePage = () => {
	// récupérer L'id dans L'URL
	const { id } = useParams();
	// navigation
	const navigate = useNavigate();

	useEffect(() => {
		//céer un eformaData
		const formData = new FormData();
		formData.append("id", id as unknown as string);
		new ArtworkAPI().delete(formData).then((response) => {
			//redirection
			navigate("/admin/artwork");
		});
	}, [id, navigate]);

	return <></>;
};

export default AdminArtworkDeletePage;
