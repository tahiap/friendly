// import
import styles from "./Connexion.module.scss"
import Join from "./components/Join"
import Login from "./components/Login"

// composant fonctionnel
function Connexion() {
	return (
		<main className={`${styles.connexion}`}>
			<Join />
		</main>
	)
}

// export du composant
export default Connexion
