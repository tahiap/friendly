// import
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context"

// composant fonctionnel qui gère l'affichage en fonction de si un utilisateur est connecté
function ProtectedRoute({ children }) {
	const { user } = useContext(AuthContext)
	return user ? children : <Navigate to="/signin" />
}

// export du composant
export default ProtectedRoute
