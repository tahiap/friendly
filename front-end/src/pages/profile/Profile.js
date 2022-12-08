// import
import styles from "./Profile.module.scss"
import { AuthContext } from "../../context"
import { useContext } from "react"

// composant fonctionnel
function Profile() {
	const { user } = useContext(AuthContext)

	return (
		<main className={`${styles.profile}`}>
			<p>Nom: {user.lastname}</p>
			<p>Prénom: {user.firstname}</p>
			<p>Pseudo: {user.pseudo}</p>
			<p>Mail: {user.email}</p>
		</main>
	)
}

// export du composant
export default Profile
