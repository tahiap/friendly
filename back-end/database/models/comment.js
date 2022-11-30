// import
const mongoose = require("mongoose")

// créé un schéma de données pour la base de données MongoDB
const commentSchema = mongoose.Schema({
	userId: { type: String, required: true },
	postId: { type: String, required: true },
	description: { type: String, required: true },
	likes: { type: Number, default: 0 },
	usersLiked: { type: Array },
})

// export du schéma en tant que modèle Mongoose, le rendant disponible pour le reste de application
module.exports = mongoose.model("Comment", commentSchema)
