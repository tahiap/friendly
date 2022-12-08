// import
import { getCurrentUser } from "../apis/connexion"

// fonction qui récupère les informations de l'utilisateur connecté
// elle est spécifiée dans le router (loader)
// le composant AuthProvider récupère ses informations grâce à useLoaderData() et les fournit à App
export async function rootLoader() {
	return getCurrentUser()
}
