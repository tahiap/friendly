// import
const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const permission = require("../middleware/permission")

const commentCtrl = require("../controllers/comment")

// définition des routes
router.post("/:postId", auth, commentCtrl.createComment)
router.put("/:id", auth, permission.userAuthComment, commentCtrl.modifyComment)
router.get("/:postId", auth, commentCtrl.getAllComments)
router.delete(
	"/:id",
	auth,
	permission.userAuthComment,
	commentCtrl.deleteComment
)
router.post("/:id/like", auth, commentCtrl.likeComment)

module.exports = router
