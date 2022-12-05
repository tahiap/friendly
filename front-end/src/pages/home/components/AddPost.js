// import
import styles from "./AddPost.module.scss"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { date } from "yup/lib/locale"

// composant fonctionnel
function AddPost({ addPost }) {
	// détermination des valeurs par défaut des champs
	const defaultValues = {
		description: "",
		image: "",
	}

	// schéma yup pour la validation des données
	const recipeSchema = yup.object({
		description: yup
			.string()
			.required("Une description doit être renseignée !")
			.min(1, "Trop court ! Au moins 1 caractère.")
			.max(250, "Trop long !"),
	})

	// récupération des méthodes
	// association du schéma yup au formulaire grâce au resolver
	const {
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
	} = useForm({
		defaultValues,
		resolver: yupResolver(recipeSchema),
	})

	// date de création de la publication
	const date = new Date()
	const creationDate =
		"Publiée le " +
		date.toLocaleDateString("fr-FR", {
			year: "2-digit",
			month: "2-digit",
			day: "2-digit",
		}) +
		" à " +
		date.toLocaleTimeString("fr-FR", {
			hour: "2-digit",
			minute: "2-digit",
		})

	// fonction gérant l'envoie du formulaire
	async function submit(values) {
		try {
			clearErrors()
			const formData = new FormData()
			formData.append("description", values.description)
			formData.append("image", values.image[0])
			formData.append("creationDate", creationDate)

			const response = await fetch("http://localhost:8080/api/post", {
				method: "POST",
				body: formData,
			})
			if (response.ok) {
				reset(defaultValues)
				addPost()
			} else {
				setError("generic", {
					type: "generic",
					message: "Il y a eu une erreur",
				})
			}
		} catch (e) {
			setError("generic", { type: "generic", message: "Il y a eu une erreur" })
		}
	}

	return (
		<div className={`${styles.addPost}`}>
			{/* formulaire */}
			<form onSubmit={handleSubmit(submit)} className={`${styles.postForm}`}>
				<h2>Créer une publication</h2>

				{/* champs description */}
				<div>
					<label>Description</label>
					<input {...register("description")} type="text" />
					{errors.description && (
						<p className="form-error">{errors.description.message}</p>
					)}
				</div>

				{/* champs image */}
				<div>
					<label>Image</label>
					<input
						{...register("image")}
						type="file"
						accept="image/jpeg, image/jpg, image/png"
					/>
					{errors.image && <p className="form-error">{errors.image.message}</p>}
				</div>

				{/* erreur générale */}
				{errors.generic && (
					<p className="form-error">{errors.generic.message}</p>
				)}

				{/* soumission du formulaire */}
				<div>
					<button disabled={isSubmitting}>Poster</button>
				</div>
			</form>
		</div>
	)
}

// export du composant
export default AddPost
