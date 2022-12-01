import { useEffect, useState } from "react"

export function useFetchData() {
	const [data, setData] = useState([])

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("http://localhost:8080/api/post")
				if (response.ok) {
					const postList = await response.json()
					if (Array.isArray(postList)) {
						setData(postList)
					} else {
						setData([postList])
					}
				} else {
					console.log("Une erreur est survenue")
				}
			} catch (e) {
				console.log("Une erreur est survenue")
			}
		}
		fetchData()
	}, [])

	return [data, setData]
}
