// import
import styles from "./App.module.scss"
import AuthProvider from "./components/AuthProvider/AuthProvider"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { useFetchData } from "./hooks/useFetchData"
import { Suspense } from "react"

// composant fonctionnel
function App() {
	const [postList, setPostList] = useFetchData()

	return (
		<div className={`${styles.appContainer}`}>
			<AuthProvider>
				<Header />
				<Suspense>
					<div className={`${styles.outletContainer}`}>
						<Outlet context={[postList, setPostList]} />
					</div>
				</Suspense>
				<Footer />
				<ScrollRestoration />
			</AuthProvider>
		</div>
	)
}

// export du composant
export default App
