// import
const cookieParser = require("cookie-parser")
const express = require("express")
const path = require("path")
const helmet = require("helmet")

require("dotenv").config()
require("./database/database")
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const commentRoutes = require("./routes/comment")

// créé une application express
const app = express()

app.use(cookieParser())
app.use(helmet())
app.use(express.json())

// ajout des headers à l'objet response
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
	res.setHeader("Access-Control-Allow-Credentials", true)
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	)
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	)
	res.setHeader("Cross-Origin-Resource-Policy", "same-site")
	next()
})

// les chemins d'URL dans le dossier de routes incluront automatiquement le préfixe
app.use("/api/auth", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)
app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
