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
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res
							.status(401)
							.json({ error: "Utilisateur et/ou mot de passe incorrect(s) !" })
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							process.env.TOKEN_SECRET_KEY,
							{
								expiresIn: "24h",
							}
						),
					})
				})
				.catch((error) => res.status(500).json({ error }))
		})
		.catch((error) => res.status(500).json({ error }))
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
