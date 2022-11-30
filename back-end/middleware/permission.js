// imports
const User = require("../database/models/user")
const Post = require("../database/models/post")
const Comment = require("../database/models/comment")

// vérifie s'il s'agit du créateur du post
exports.userAuthPost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			if (post.userId !== req.auth.userId) {
				res
					.status(401)
					.json({
						message: "Non autorisé : vous n'êtes pas propriétaire du post",
					})
			} else next()
		})
		.catch((error) => {
			res.status(500).json({ error })
		})
}

// vérifie s'il s'agit du créateur du commentaire
exports.userAuthComment = (req, res, next) => {
	Comment.findOne({ _id: req.params.id })
		.then((comment) => {
			if (comment.userId !== req.auth.userId) {
				res.status(401).json({ message: "Non autorisé" })
			} else next()
		})
		.catch((error) => {
			res.status(500).json({ error })
		})
}

// vérifie s'il s'agit d'un administrateur
exports.userAdmin = (req, res, next) => {
	User.findOne({ _id: req.auth.userId })
		.then((user) => {
			if (!user.isAdmin) {
				res
					.status(401)
					.json({
						message: "Non autorisé: vous n'avez pas les droits administrateur",
					})
			} else next()
		})
		.catch((error) => {
			res.status(500).json({ error })
		})
}
