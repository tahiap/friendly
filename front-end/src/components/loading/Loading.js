// import
import styles from "./Loading.module.scss"

// composant fonctionnel
function Loading() {
	return (
		<div className={`${styles.loading}`}>
			<i className={`fa-solid fa-spinner ${styles.spinner}`}></i>
		</div>
	)
}

// export du composant
export default Loading
