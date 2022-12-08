// import
import styles from "../Connexion.module.scss"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { createUser } from "../../../apis/signup"

// composant fonctionnel
function Signup() {
	const navigate = useNavigate()

	// détermination des valeurs par défaut des champs
	const defaultValues = {
		lastname: "",
		firstname: "",
		pseudo: "",
		email: "",
		password: "",
		confirmPassword: "",
	}

	// définition regex
	const nameRegex = /^[A-z ,.'-]+$/
	const pseudoRegex = /^[A-z1-9._-]+$/
	const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

	// définition messages d'erreurs
	const required = "Ce champ est obligatoire."
	const minLenghtName = 2
	const minLenghtMessage = "Trop court ! Au moins 2 caractères."
	const maxLengthName = 30
	const maxLenghtMessage = "Trop long ! 30 caractères maximum."

	// schéma yup pour la validation des données
	const recipeSchema = yup.object({
		lastname: yup
			.string()
			.required(required)
			.min(minLenghtName, minLenghtMessage)
			.max(maxLengthName, maxLenghtMessage)
			.matches(nameRegex, "Pas de chiffres ou de caractères spéciaux**."),
		firstname: yup
			.string()
			.required(required)
			.min(minLenghtName, minLenghtMessage)
			.max(maxLengthName, maxLenghtMessage)
			.matches(nameRegex, "Pas de chiffres ou de caractères spéciaux**."),
		pseudo: yup
			.string()
			.required(required)
			.min(minLenghtName, minLenghtMessage)
			.max(maxLengthName, maxLenghtMessage)
			.matches(pseudoRegex, "Caractères spéciaux acceptés : . - _"),
		email: yup
			.string()
			.required(required)
			.min(6, "Trop court ! Minimum 6 caractères.")
			.max(320, "Trop long ! Maximum 320 caractères.")
			.matches(
				emailRegex,
				"Ce champs doit contenir le caractère '@'. Par exemple : nom.prenom@mail.com."
			),
		password: yup
			.string()
			.required(required)
			.min(8, "Trop court ! Minimum 8 caractères.")
			.matches(
				passwordRegex,
				"Votre mot de passe doit comporter au moins une minuscule, une majuscule et un chiffre."
			),
		confirmPassword: yup
			.string()
			.required(required)
			.oneOf(
				[yup.ref("password"), ""],
				"Les mots de passe ne correspondent pas."
			),
	})

	// récupération des méthodes
	// association du schéma yup au formulaire grâce au resolver
	const {
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
		setError,
		clearErrors,
	} = useForm({
		defaultValues,
		resolver: yupResolver(recipeSchema),
	})

	// fonction gérant l'envoie du formulaire
	const submit = handleSubmit(async (user) => {
		try {
			clearErrors()
			await createUser(user)
			navigate("/signin")
		} catch (message) {
			setError("generic", { type: "generic", message })
		}
	})
	// async function submit(newUser) {
	// 	try {
	// 		clearErrors()
	// 		const response = await fetch("http://localhost:8080/api/auth/signup", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(newUser),
	// 		})
	// 		if (response.ok) {
	// 			reset(defaultValues)
	// 		} else {
	// 			setError("generic", {
	// 				type: "generic",
	// 				message: "Il y a eu une erreur",
	// 			})
	// 		}
	// 	} catch (e) {
	// 		setError("generic", { type: "generic", message: "Il y a eu une erreur" })
	// 	}
	// }

	return (
		<div className={`${styles.join}`}>
			<h1>Inscription</h1>
			<form onSubmit={handleSubmit(submit)} className={`${styles.formToJoin}`}>
				{/* champs lastname */}
				<div className={`${styles.formElement}`}>
					<label htmlFor="lastname">Nom*</label>
					<input {...register("lastname")} type="text" id="lastname" />
					{errors.lastname && (
						<p className="form-error">{errors.lastname.message}</p>
					)}
				</div>

				{/* champs firstname */}
				<div className={`${styles.formElement}`}>
					<label htmlFor="firstname">Prénom*</label>
					<input {...register("firstname")} type="text" id="firstname" />
					{errors.firstname && (
						<p className="form-error">{errors.firstname.message}</p>
					)}
				</div>

				{/* champs pseudo */}
				<div className={`${styles.formElement}`}>
					<label htmlFor="pseudo">Pseudo*</label>
					<input {...register("pseudo")} type="text" id="pseudo" />
					{errors.pseudo && (
						<p className="form-error">{errors.pseudo.message}</p>
					)}
				</div>

				{/* champs email */}
				<div className={`${styles.formElement}`}>
					<label htmlFor="email">Email*</label>
					<input {...register("email")} type="text" id="email" />
					{errors.email && <p className="form-error">{errors.email.message}</p>}
				</div>

				{/* champs password */}
				<div className={`${styles.formElement}`}>
					<label htmlFor="password">Mot de passe*</label>
					<input {...register("password")} type="password" id="password" />
					{errors.password && (
						<p className="form-error">{errors.password.message}</p>
					)}
				</div>

				{/* champs confirmPassword */}
				<div className={`${styles.formElement}`}>
					<label htmlFor="confirmPassword">Confirmation du mot de passe*</label>
					<input
						{...register("confirmPassword")}
						type="password"
						id="confirmPassword"
					/>
					{errors.confirmPassword && (
						<p className="form-error">{errors.confirmPassword.message}</p>
					)}
				</div>

				{/* erreur générale */}
				{errors.generic && (
					<p className="form-error">{errors.generic.message}</p>
				)}

				<div className={`${styles.formElement}`}>
					<p>* : champ requis.</p>
					<p>** : caractères spéciaux admis [- ' .].</p>
				</div>

				{/* soumission du formulaire */}
				<div className={`${styles.formElement}`}>
					<button disabled={isSubmitting} className="btn btn-connexion">
						S'inscrire
					</button>
				</div>
			</form>

			<p>
				Déjà inscrit ? <Link to="/login">Connexion</Link>
			</p>
		</div>
	)
}

// export du composant
export default Signup
