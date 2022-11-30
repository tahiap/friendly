// import
const multer = require("multer")

// dictionnaire de mime_types qu'on peut avoir depuis le frontend
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
}

// configure le chemin et le nom de fichier pour les fichiers entrants
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images")
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_")
		const extension = MIME_TYPES[file.mimetype]
		callback(null, name + Date.now() + "." + extension)
	},
})

// export du multer configuré
module.exports = multer({ storage: storage }).single("image")
