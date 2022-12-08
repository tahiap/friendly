// import
import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom"
import { useContext, useState } from "react"
import HeaderMenuXs from "./components/HeaderMenuXs"
import { AuthContext } from "../../context"

// composant fonctionnel
function Header() {
	const [showMenuXs, setShowMenuXs] = useState(false)
	const { user, logout } = useContext(AuthContext)

	return (
		<header>
			<nav>
				{user ? (
					<ul className={`${styles.headerList}`}>
						<li>
							<NavLink end to="/">
								Accueil
							</NavLink>
						</li>
						<li>
							<NavLink to="/profile">Profil</NavLink>
						</li>
						<li>
							<NavLink onClick={() => logout()}>Déconnexion</NavLink>
						</li>
					</ul>
				) : (
					<ul className={`${styles.headerList}`}>
						<li>
							<NavLink to="/signup">Inscription</NavLink>
						</li>
						<li>
							<NavLink to="/signin">Connexion</NavLink>
						</li>
					</ul>
				)}
				<i
					className={`fa-solid fa-bars fa-xl ${styles.headerXs}`}
					onClick={() => setShowMenuXs(true)}
				></i>
				{showMenuXs && (
					<>
						<div onClick={() => setShowMenuXs(false)} className="calc"></div>
						<HeaderMenuXs />
					</>
				)}
			</nav>
		</header>
	)
}

// export du composant
export default Header
