// import
const fs = require("fs")
const Post = require("../database/models/post")

// middleware pour créer un post
exports.createPost = (req, res, next) => {
	const imageUrl = req.file
		? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		: null
	const post = new Post({
		// userId: req.auth.userId,
		pseudo: req.body.pseudo,
		date: req.body.date,
		description: req.body.description,
		imageUrl: imageUrl,
	})

	post
		.save()
		.then(() => {
			res.status(201).json({ message: "Post enregistré !" })
		})
		.catch((error) => {
			res.status(400).json({ error })
		})
}

// middleware pour afficher tous les posts
exports.getAllPosts = (req, res, next) => {
	Post.find()
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			})
		})
}

// middleware pour supprimer un post
exports.deletePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			if (post.file) {
				const filename = post.imageUrl.split("/images/")[1]
				// supprime l'image et exécute la fonction de suppression
				fs.unlink(`images/${filename}`, () => {
					Post.deleteOne({ _id: req.params.id })
						.then(() => {
							res.status(200).json({ message: "Post supprimé !" })
						})
						.catch((error) => res.status(401).json({ error }))
				})
			} else {
				Post.deleteOne({ _id: req.params.id })
					.then(() => {
						res.status(200).json({ message: "Post supprimé !" })
					})
					.catch((error) => res.status(401).json({ error }))
			}
		})
		.catch((error) => {
			res.status(500).json({ error })
		})
}

// middleware pour afficher un post
exports.getOnePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			res.status(200).json(post)
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			})
		})
}

// middleware pour modifier un post
exports.modifyPost = (req, res, next) => {
	// vérifie si la requête contient un fichier
	const postObject = req.file
		? {
				...req.body,
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body }

	Post.findOne({ _id: req.params.id })
		.then((post) => {
			if (post.file) {
				const filename = post.imageUrl.split("/images/")[1]
				// supprime l'image et exécute la fonction de mise à jour
				fs.unlink(`images/${filename}`, () => {
					Post.updateOne(
						{ _id: req.params.id },
						{ ...postObject, _id: req.params.id }
					)
						.then(() => res.status(200).json({ message: "Post modifié !" }))
						.catch((error) => res.status(401).json({ error }))
				})
			} else {
				Post.updateOne(
					{ _id: req.params.id },
					{ ...postObject, _id: req.params.id }
				)
					.then(() => res.status(200).json({ message: "Post modifié !" }))
					.catch((error) => res.status(401).json({ error }))
			}
		})
		.catch((error) => {
			res.status(400).json({ error })
		})
}

// middleware pour ajouter un like à un post
exports.likePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			switch (req.body.like) {
				case 1:
					// ajouter un like
					if (!post.usersLiked.includes(req.body.userId)) {
						Post.updateOne(
							{ _id: req.params.id },
							{
								$inc: { likes: 1 },
								$push: { usersLiked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Like ajouté" }))
							.catch((error) => {
								res.status(400).json({ error })
							})
					}
					break
				case 0:
					// retirer le like
					if (post.usersLiked.includes(req.body.userId)) {
						Post.updateOne(
							{ _id: req.params.id },
							{
								$inc: { likes: -1 },
								$pull: { usersLiked: req.body.userId },
							}
						)
							.then(() => res.status(201).json({ message: "Like retiré" }))
							.catch((error) => {
								res.status(400).json({ error })
							})
					}
					break
			}
		})

		.catch((error) => {
			res.status(404).json({ error })
		})
}
