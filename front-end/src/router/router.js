// import
import { lazy } from "react"
import { createBrowserRouter } from "react-router-dom"
import { rootLoader } from "../loaders/rootLoader"
import App from "../App"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
// import Signin from "../pages/Connexion/components/Signin"
// import Home from "../pages/Home/Home"
// import ErrorPage from "../pages/ErrorPage/ErrorPage"
// import Signup from "../pages/Connexion/components/Signup"
// import Profile from "../pages/Profile/Profile"

const Home = lazy(() => import("../pages/Home/Home"))
const Profile = lazy(() => import("../pages/Profile/Profile"))
const Signin = lazy(() => import("../pages/Connexion/components/Signin"))
const Signup = lazy(() => import("../pages/Connexion/components/Signup"))
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"))

// création du router
export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		loader: rootLoader,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: "/profile",
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/signin",
				element: <Signin />,
			},
		],
	},
])
