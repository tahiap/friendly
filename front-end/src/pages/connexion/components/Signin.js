// import
import styles from "../Connexion.module.scss"
import { Link, Navigate } from "react-router-dom"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useContext } from "react"
import { AuthContext } from "../../../context"

// composant fonctionnel
function Signin() {
	const { login, user } = useContext(AuthContext)

	// détermination des valeurs par défaut des champs
	const defaultValues = {
		email: "",
		password: "",
	}

	// définition messages d'erreurs
	const required = "Ce champ est obligatoire."

	// schéma yup pour la validation des données
	const recipeSchema = yup.object({
		email: yup.string().required(required),

		password: yup.string().required(required),
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
	const submit = handleSubmit(async (credentials) => {
		try {
			clearErrors()
			await login(credentials)
		} catch (message) {
			setError("generic", { type: "generic", message })
		}
	})

	// async function submit(credentials) {
	// 	try {
	// 		clearErrors()
	// 		const response = await fetch("http://localhost:8080/api/auth/login", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			credentials: "include",
	// 			body: JSON.stringify(credentials),
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
		<>
			{user ? (
				<Navigate to="/" />
			) : (
				<div className={`${styles.login}`}>
					<h1>Connexion</h1>
					<form
						onSubmit={handleSubmit(submit)}
						className={`${styles.formToLogin}`}
					>
						{/* champs email */}
						<div className={`${styles.formElement}`}>
							<label htmlFor="email">Email*</label>
							<input {...register("email")} type="text" id="email" />
							{errors.email && (
								<p className="form-error">{errors.email.message}</p>
							)}
						</div>

						{/* champs password */}
						<div className={`${styles.formElement}`}>
							<label htmlFor="password">Mot de passe*</label>
							<input {...register("password")} type="password" id="password" />
							{errors.password && (
								<p className="form-error">{errors.password.message}</p>
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
								Se connecter
							</button>
						</div>
					</form>

					<p>
						Pas encore inscrit ? <Link to="/join">S'inscrire</Link>
					</p>
				</div>
			)}
		</>
	)
}

// export du composant
export default Signin
