import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import type User from "../model/user";
import { useNavigate } from "react-router-dom";
import SecurityAPI from "../service/security_api";
import { useState } from "react";
import Notice from "./common/Notice";

/*
    handleSubmit permet de gérer la soumission du formulaire 
    register permet de référencer les champs de formulaire 
    errors permet de gérer les messages d'erreur
    reset permet de réinitilaiser /mettre à jour les données d'un formulaire
     >sur les cases à cocher , utiliser un array
    */
const RegisterForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<User>();

	//
	const navigate = useNavigate();

	// const navigate = useNavigate();
	//récupérer l'identifiant de l'URL

	//message de formulaire
	const [message, setMessage] = useState<string>();
	// requete HTTP
	const onSubmit = async (values: User) => {
		const request = await new SecurityAPI().register(values);

		console.log(request);

		// console.log(values);

		if ([200, 201].indexOf(request.status) > -1) {
			// stocker un message en session
			window.sessionStorage.setItem("notice", "Account created");

			//redirection
			navigate("/connection");
		} else {
			//afficher un message
			setMessage("Erreur.verifie votre information");
		}
	};

	//requéte HTTP

	//

	return (
		<>
			<h2> Register </h2>

			<Notice />

			{message ? <p>{message}</p> : null}

			<form onSubmit={handleSubmit(onSubmit)}>
				<ul>
					<p>
						<label htmlFor="fristname">Nom</label>
						{/* rependre STRICTEMENT le nom des colonnes SQL */}

						<input
							type="firstname"
							id="firstname"
							{...register("firstname", {
								required: "firstname is requiredce",
							})}
						/>
						<small>{errors.firstname?.message}</small>
					</p>
				</ul>
				<p>
					<label htmlFor="lastname">Prénom</label>
					{/* rependre STRICTEMENT le nom des colonnes SQL */}
					<input
						type="lastname"
						// id="description"
						{...register("lastname", {
							required: "lastname is required",
						})}
					/>
					<small>{errors.lastname?.message}</small>
				</p>

				<p>
					<label htmlFor="phone">Télephone</label>
					{/* rependre STRICTEMENT le nom des colonnes SQL */}
					<input
						type="phone"
						// id="price"
						{...register("phone", {
							required: "phone is required",
						})}
					/>
					<small> {errors.phone?.message}</small>
				</p>

				<p>
					<label htmlFor="email">Email</label>
					{/* rependre STRICTEMENT le nom des colonnes SQL */}
					<input
						type="email"
						{...register("email", {
							required: "email is required",
						})}
					/>

					<small> {errors.email?.message}</small>
				</p>
				<p>
					<label htmlFor="password">Mot de passe</label>
					{/* rependre STRICTEMENT le nom des colonnes SQL */}
					<input
						type="password"
						// id="description"
						{...register("password", {
							required: "password is required",
						})}
					/>
					<small>{errors.password?.message}</small>
				</p>

				<button type="submit">s'inscrire</button>
			</form>
		</>
	);
};

export default RegisterForm;
