// import
import { getCurrentUser } from "../apis/connexion"

// fonction qui récupère les informations de l'utilisateur connecté grâce au token stocké dans les cookies
// elle est spécifiée dans le router (loader)
export async function rootLoader() {
	return getCurrentUser()
}
