// import
import "./Footer.module.scss"

// composant fonctionnel
function Footer() {
	return (
		<footer>
			<div>
				<p>
					<i className="fa-regular fa-copyright"></i>Développé en 2022 avec
					React.js <i className="fa-brands fa-react fa-xl"></i> et Node.js{" "}
					<i className="fa-brands fa-node-js fa-lg"></i>
				</p>
			</div>
		</footer>
	)
}

// export du composant
export default Footer
