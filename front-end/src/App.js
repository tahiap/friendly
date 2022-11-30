// import
import styles from "./App.module.scss"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import { Outlet, ScrollRestoration } from "react-router-dom"

// composant fonctionnel
function App() {
	return (
		<div className={`${styles.appContainer}`}>
			<Header />
			<div className={`${styles.outletContainer}`}>
				{/* <Outlet context={data} /> */}
			</div>
			<Footer />
			<ScrollRestoration />
		</div>
	)
}

// export du composant
export default App
