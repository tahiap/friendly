// import
import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import HeaderMenuXs from "./components/HeaderMenuXs"

// composant fonctionnel Header
function Header() {
	const [showMenuXs, setShowMenuXs] = useState(false)

	return (
		<header>
			<nav>
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
						<NavLink to="/connexion">Déconnexion</NavLink>
					</li>
				</ul>
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
