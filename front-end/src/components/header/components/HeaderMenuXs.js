// import
import { Link } from "react-router-dom"
import styles from "./HeaderMenuXs.module.scss"

// composant fonctionnel
function HeaderMenuXs() {
	return (
		<ul className={`${styles.headerMenuXs}`}>
			<li>
				<Link end to="/">
					Accueil
				</Link>
			</li>
			<li>
				<Link end to="/profile">
					Profil
				</Link>
			</li>
			<li>
				<Link to="/connexion">Déconnexion</Link>
			</li>
		</ul>
	)
}

// export du composant
export default HeaderMenuXs
