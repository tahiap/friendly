// import
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import stylesEditPost from "./EditPost.module.scss"
import stylesPostItem from "./PostItem.module.scss"
import profilePhoto from "../../../assets/images/user.jpeg"

// composant fonctionnel
function EditPost({ post, updatePost }) {
	// détermination des valeurs par défaut des champs
	const defaultValues = {
		description: post.description,
		image: post.imageUrl,
	}

	// schéma yup pour la validation des données
	const recipeSchema = yup.object({
		description: yup
			.string()
			.required("Une description doit être renseignée !")
			.min(1, "Trop court ! Au moins 1 caractère.")
			.max(250, "Trop long !"),
		image: yup.string().url("L'image doit être un lien valide").nullable(),
	})

	// récupération des méthodes
	// association du schéma yup au formulaire grâce au resolver
	const {
		getValues,
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
		setError,
		clearErrors,
	} = useForm({
		defaultValues,
		resolver: yupResolver(recipeSchema),
	})

	// récupération des valeurs contenues dans les champs
	const descriptionValue = getValues("description")
	const imageValue = getValues("image")

	// fonction gérant l'envoie du formulaire
	async function submit(values) {
		try {
			clearErrors()
			const response = await fetch(
				`http://localhost:8080/api/post/${post._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				}
			)
			if (response.ok) {
				updatePost({
					...post,
					description: descriptionValue,
					image: imageValue,
					edit: false,
				})
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
		<article
			className={`${
				post.imageUrl
					? stylesPostItem.postWithImg
					: stylesPostItem.postWithoutImg
			}`}
		>
			{/* Partie IMAGE */}
			<div className={`${stylesPostItem.postImgPart}`}>
				<img src={post.imageUrl} alt="publication utilisateur" />
			</div>

			{/* Partie DESCRIPTION */}
			<div className={`${stylesPostItem.postTextPart}`}>
				<div className={`${stylesPostItem.postUserThumbnail} thumbnail-2xl`}>
					<img src={profilePhoto} alt="profile user" />
				</div>
				<p className={`${stylesPostItem.postUserPseudo}`}>{post.pseudo}</p>
				<p className={`${stylesPostItem.postDate}`}>{post.date}</p>

				{/* formulaire */}
				<form
					onSubmit={handleSubmit(submit)}
					className={`${stylesEditPost.editForm}`}
				>
					{/* champs description */}
					<div className={`${stylesEditPost.descriptionField}`}>
						<label htmlFor="description" className="display-none"></label>
						<input {...register("description")} type="text"></input>
						{errors.description && (
							<p className="form-error">{errors.description.message}</p>
						)}
					</div>

					{/* champs image */}
					<div className={`${stylesEditPost.editImage}`}>
						<label htmlFor="image" className="display-none"></label>
						<input {...register("image")} type="text" />
						{errors.image && (
							<p className="form-error">{errors.image.message}</p>
						)}
					</div>

					{/* Bouton pour annuler l'édition de la publication */}
					<button
						onClick={() => {
							updatePost({ ...post, edit: false })
						}}
						type="button"
						className={`${stylesEditPost.cancelPostEdition} btn`}
					>
						<i
							className="fa-solid fa-circle-xmark fa-2xl btn-icon-warning"
							title="Annuler"
							aria-label="Annuler"
						></i>
					</button>

					{/* Bouton pour valider l'édition de la publication */}
					<button
						disabled={isSubmitting}
						className={`${stylesEditPost.savePostEdition} btn`}
					>
						<i
							className="fa-solid fa-circle-check fa-2xl btn-icon-validation"
							title="Enregistrer"
							aria-label="Enregistrer"
						></i>
					</button>
				</form>
			</div>

			{/* Partie COMMENTAIRE */}
			<div className={`${stylesPostItem.postCommentsPart}`}>
				<p>Pas de commentaires pour le moment.</p>
			</div>
		</article>
	)
}

// export du composant
export default EditPost
