// import
import styles from "./ErrorPage.module.scss"
import { Link } from "react-router-dom"

// composant fonctionnel
function ErrorPage() {
	return (
		<main className={`${styles.errorPage}`}>
			<h1>404</h1>
			<p>Oups! Cette page n'existe pas.</p>
			<p>
				Revenez à la page d'accueil en cliquant <Link to="/">ici</Link>.
			</p>
		</main>
	)
}

// export du composant
export default ErrorPage
