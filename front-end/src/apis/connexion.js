export async function signin(credentials) {
	const response = await fetch("http://localhost:8080/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(credentials),
	})
	const body = await response.json()
	if (response.ok) {
		return body
	} else {
		if (body) {
			throw body
		} else {
			throw new Error("Oops une erreur est survenue")
		}
	}
}

export async function getCurrentUser() {
	const response = await fetch("http://localhost:8080/api/auth/current", {
		method: "GET",
		credentials: "include",
	})
	return response.json()
}

export async function signout() {
	await fetch("http://localhost:8080/api/auth/login", {
		method: "DELETE",
		credentials: "include",
	})
}
