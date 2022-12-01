// import
import styles from "./App.module.scss"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { useFetchData } from "./hooks/useFetchData"

// composant fonctionnel
function App() {
	const [postList, setPostList] = useFetchData()

	return (
		<div className={`${styles.appContainer}`}>
			<Header />
			<div className={`${styles.outletContainer}`}>
				<Outlet context={[postList, setPostList]} />
			</div>
			<Footer />
			<ScrollRestoration />
		</div>
	)
}

// export du composant
export default App
