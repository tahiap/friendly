// import
import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import ErrorPage from "../pages/errorPage/ErrorPage"
import Home from "../pages/home/Home"
import Connexion from "../pages/connexion/Connexion"
import Profile from "../pages/profile/Profile"

// création du router
export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/connexion",
				element: <Connexion />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
		],
	},
])
