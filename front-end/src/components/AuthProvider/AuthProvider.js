// import
import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { AuthContext } from "../../context"
import { signin, signout } from "../../apis/connexion"

// composant fonctionnel qui a pour but de gérer l'utilisateur connecté
function AuthProvider({ children }) {
	// useLoaderData récupère la réponse de la fonction getCurrentUser()
	const initialUser = useLoaderData()
	const [user, setUser] = useState(initialUser)

	// exécute fonction signin() et modifie le state en assignant sa réponse au user
	async function login(credentials) {
		const currentUser = await signin(credentials)
		setUser(currentUser)
	}

	// exécute fonction signout() et modifie le state en assignant la valeur null au user
	async function logout() {
		await signout()
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

// export du composant
export default AuthProvider
