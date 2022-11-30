// import
const Comment = require("../database/models/comment")

// middleware pour créer un commentaire
exports.createComment = (req, res, next) => {
	const comment = new Comment({
		userId: req.auth.userId,
		postId: req.params.postId,
		description: req.body.description,
	})

	comment
		.save()
		.then(() => {
			res.status(201).json({ message: "Commentaire enregistré !" })
		})
		.catch((error) => {
			res.status(400).json({ error })
		})
}

// middleware pour afficher tous les commentaires relatifs à un post
exports.getAllComments = (req, res, next) => {
	Comment.find({ postId: req.params.postId })
		.then((comments) => {
			res.status(200).json(comments)
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			})
		})
}

// middleware pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
	Comment.deleteOne({ _id: req.params.id })
		.then(() => {
			res.status(200).json({ message: "Commentaire supprimé !" })
		})
		.catch((error) => res.status(401).json({ error }))
}

// middleware pour modifier un commentaire
exports.modifyComment = (req, res, next) => {
	const commentObject = req.body
	Comment.updateOne(
		{ _id: req.params.id },
		{ ...commentObject, _id: req.params.id }
	)
		.then(() => res.status(200).json({ message: "Commentaire modifié !" }))
		.catch((error) => res.status(401).json({ error }))
}

// middleware pour ajouter un like à un commentaire
exports.likeComment = (req, res, next) => {
	Comment.findOne({ _id: req.params.id })
		.then((comment) => {
			switch (req.body.like) {
				case 1:
					// ajouter un like
					if (!comment.usersLiked.includes(req.body.userId)) {
						Comment.updateOne(
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
					if (comment.usersLiked.includes(req.body.userId)) {
						Comment.updateOne(
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
