import { useForm } from "react-hook-form";
import type User from "../../../model/user";
import { Link, useNavigate } from "react-router-dom";
import SecurityAPI from "../../../service/security_api";
import { useContext, useState } from "react";
import Notice from "../../common/Notice";
import { UserContext } from "../../../provider/UserProvider";

const ConnectionForm = () => {
	/*
    handleSubmit permet de gérer la soumission du formulaire 
    register permet de référencer les champs de formulaire 
    errors permet de gérer les messages d'erreur 
    */
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<User>();

	//redirection
	const navigate = useNavigate();
	// const navigate = useNavigate();
	//récupérer l'identifiant de l'URL

	//message de formulaire
	const [message, setMessage] = useState<string>();

	//contexte
	const { user, setUser } = useContext(UserContext);
	// requete HTTP
	const onSubmitConnection = async (values: User) => {
		console.log(values);
		const request = await new SecurityAPI().connection(values);

		console.log(values);

		//tester le code de statut HTTP

		if ([200, 201].indexOf(request.status) > -1) {
			// stocker un message en session
			// window.sessionStorage.setItem("notice", "Account created");
			setUser(request.data);
			//redirection
			// navigate("/connection");

			if (request.data.role.name === "admin") {
				navigate("/admin");
			} else if (request.data.role.name === "user") {
				navigate("/register");
			}

			// 	navigate("/");
		} else {
			setMessage("echouee");

			navigate("/");
		}
	};

	return (
		<>
			<h2>Connection</h2>

			<Notice />

			{message ? <p>{message}</p> : null}

			<form onSubmit={handleSubmit(onSubmitConnection)}>
				<p>
					<label htmlFor="email">Email</label>
					{/* rependre STRICTEMENT le nom des colonnes SQL */}
					<input
						type="email"
						{...register("email", {
							required: "email is required",
							min: {
								value: 5,
								message: "email is too short",
							},
						})}
					/>
					<small> {errors.email?.message}</small>
				</p>
				<p>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						{...register("password", {
							required: "password is required",
							min: {
								value: 5,
								message: "password is too short",
							},
						})}
					/>
					<small> {errors.password?.message}</small>
				</p>
				<p>
					<button type="submit"> Valider</button>
				</p>

				<Link to="/register">Inscription</Link>
			</form>
		</>
	);
};

export default ConnectionForm;
