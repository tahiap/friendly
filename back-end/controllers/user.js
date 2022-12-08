// import
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../database/models/user")

// middleware d'inscription
exports.signup = (req, res, next) => {
	const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
	const emailRegex =
		/[A-Za-z0-9](([_.-]?[A-Za-z0-9]+)*)@([A-Za-z0-9]+)(([_.-]?[A-Za-z0-9]+)*).([A-Za-z]{2,})/

	if (
		passwordRegex.test(req.body.password) &&
		emailRegex.test(req.body.email)
	) {
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) => {
				const user = new User({
					lastname: req.body.lastname,
					firstname: req.body.firstname,
					pseudo: req.body.pseudo,
					email: req.body.email,
					password: hash,
				})
				user
					.save()
					.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
					.catch((error) => res.status(400).json({ error }))
			})
			.catch((error) => res.status(500).json({ error }))
	} else {
		return res
			.status(403)
			.json({ message: "L'email et/ou le mot passe ne sont pas valides." })
	}
}

// middleware de connexion
exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ error: "Utilisateur et/ou mot de passe incorrect(s) !" })
			} else {
				bcrypt
					.compare(req.body.password, user.password)
					.then((valid) => {
						if (!valid) {
							return res.status(401).json({
								error: "Utilisateur et/ou mot de passe incorrect(s) !",
							})
						} else {
							const userId = user._id
							const token = jwt.sign(
								{ sub: userId.toString() },
								process.env.TOKEN_SECRET_KEY,
								{
									expiresIn: 3600 * 24 * 30 * 6,
								}
							)
							res.cookie("token", token, { httpOnly: true })
							res.status(200).json({
								userId: userId,
								token: token,
							})
						}
					})
					.catch((error) => res.status(500).json({ error }))
			}
		})
		.catch((error) => res.status(500).json({ error }))
}

// middleware pour récupérer l'utilisateur connecté grâce au token qui se trouve dans les cookies
exports.getCurrentUser = async (req, res, next) => {
	const token = req.cookies.token
	if (token) {
		try {
			const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
			const userId = decodedToken.sub
			const currentUser = await User.findOne({ _id: userId }).select(
				"-password -__v"
			)
			if (currentUser) {
				return res.json(currentUser)
			} else {
				return res.json(null)
			}
		} catch (e) {
			console.log(e)
			return res.json(null)
		}
	} else {
		console.log("Pas de token trouvé !")
		return res.json(null)
	}
}

// middleware pour supprimer le token des cookies lors de la déconnexion
exports.logout = async (req, res, next) => {
	res.clearCookie("token")
	res.end()
}

// middleware pour modifier le statut administrateur de l'utilisateur
exports.adminSwitch = (req, res, next) => {
	User.findOne({ _id: req.params.userId })
		.then((user) => {
			switch (user.isAdmin) {
				case false:
					// switch isAdmin : true
					User.updateOne(
						{ _id: req.params.userId },
						{
							$set: { isAdmin: true },
						}
					)
						.then(() =>
							res.status(201).json({
								message: "Statut modifié ; statut actuel : administrateur",
							})
						)
						.catch((error) => {
							res.status(400).json({ error })
						})

					break
				case true:
					// switch isAdmin : false
					User.updateOne(
						{ _id: req.params.userId },
						{
							$set: { isAdmin: false },
						}
					)
						.then(() =>
							res
								.status(201)
								.json({ message: "Statut modifié ; statut actuel : basic" })
						)
						.catch((error) => {
							res.status(400).json({ error })
						})

					break
			}
		})

		.catch((error) => {
			res.status(404).json({ error })
		})
}
