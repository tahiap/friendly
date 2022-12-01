// import
import styles from "./PostItem.module.scss"
import profilePhoto from "../../../assets/images/user.jpeg"

// composant fonctionnel
function PostItem({ post, updatePost, deletePost }) {
	async function handleClickDelete() {
		try {
			const response = await fetch(
				`http://localhost:8080/api/post/${post._id}`,
				{ method: "DELETE" }
			)
			if (response.ok) {
				deletePost(post._id)
			}
		} catch (e) {
			console.log("Erreur")
		}
	}

	return (
		<article
			className={`${
				post.imageUrl ? styles.postWithImg : styles.postWithoutImg
			}`}
		>
			{/* Partie IMAGE */}
			<div className={`${styles.postImgPart} `}>
				<img src={post.imageUrl} alt="publication utilisateur" />
			</div>

			{/* Partie DESCRIPTION */}
			<div className={`${styles.postTextPart}`}>
				<div className={`${styles.postUserThumbnail} thumbnail-2xl`}>
					<img src={profilePhoto} alt="profile user" />
				</div>
				<p className={`${styles.postUserPseudo}`}>{post.pseudo}</p>
				<p className={`${styles.postDate}`}>{post.date}</p>
				<p className={`${styles.postDescription}`}>{post.description}</p>

				{/* Bouton pour AIMER la publication */}
				<button className={`${styles.likePost}  btn`}>
					<i
						title="J'aime"
						aria-label="J'aime"
						className={`fa-solid fa-heart btn-icon-secondary fa-xl ${
							post.likes ? styles.liked : ""
						}`}
					></i>
				</button>

				{/* Bouton pour passer la publication en FULLSCREEN */}
				<button className={`${styles.postFullscreen} btn`}>
					<i
						className={`fa-solid fa-up-right-and-down-left-from-center fa-lg  btn-icon-primary`}
						title="Voir la publication"
						aria-label="Voir la publication"
					></i>
				</button>

				{/* Bouton pour ÉDITER la publication */}
				<button
					onClick={() => {
						updatePost({ ...post, edit: true })
					}}
					className={`${styles.editPost} btn`}
				>
					<i
						className="fa-solid fa-pencil fa-lg btn-icon-primary"
						title="Modifier"
						aria-label="Modifier"
					></i>
				</button>

				{/* Bouton pour SUPPRIMER la publication */}
				<button
					className={`${styles.deletePost} btn`}
					onClick={handleClickDelete}
				>
					<i
						className="fa-solid fa-trash fa-lg btn-icon-warning"
						title="Supprimer"
						aria-label="Supprimer"
					></i>
				</button>
			</div>

			{/* Partie COMMENTAIRES */}
			<div className={`${styles.postCommentsPart}`}>
				<p>Pas de commentaires pour le moment.</p>
			</div>
		</article>
	)
}

// export du composant
export default PostItem
