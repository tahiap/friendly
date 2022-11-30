// import
const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const permission = require("../middleware/permission")

const postCtrl = require("../controllers/post")

// définition des routes
router.post("/", multer, postCtrl.createPost)
router.put("/:id", multer, postCtrl.modifyPost)
router.get("/", postCtrl.getAllPosts)
router.get("/:id", postCtrl.getOnePost)
router.delete("/:id", postCtrl.deletePost)
router.post("/:id/like", postCtrl.likePost)

// router.post("/", auth, multer, postCtrl.createPost)
// router.put(
// 	"/:id",
// 	auth,
// 	permission.userAuthPost || permission.userAdmin,
// 	multer,
// 	postCtrl.modifyPost
// )
// router.get("/", auth, postCtrl.getAllPosts)
// router.get("/:id", auth, postCtrl.getOnePost)
// router.delete(
// 	"/:id",
// 	auth,
// 	permission.userAuthPost || permission.userAdmin,
// 	postCtrl.deletePost
// )
// router.post("/:id/like", auth, postCtrl.likePost)

module.exports = router
