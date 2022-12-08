export async function createUser(newUser) {
	const response = await fetch("http://localhost:8080/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	})
	const body = await response.json()
	if (response.ok) {
		return body
	} else {
		if (body) {
			throw body
		} else {
			throw new Error("Error api createUser")
		}
	}
}
