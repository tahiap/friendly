// import
const mongoose = require("mongoose")

// créé un schéma de données pour la base de données MongoDB
const postSchema = mongoose.Schema({
	userId: { type: String },
	pseudo: { type: String },
	date: { type: String },
	description: { type: String, required: true },
	imageUrl: { type: String },
	edit: { type: Boolean, default: false },
	likes: { type: Number, default: 0 },
	usersLiked: { type: Array },
})

// export du schéma en tant que modèle Mongoose, le rendant disponible pour le reste de application
module.exports = mongoose.model("Post", postSchema)
