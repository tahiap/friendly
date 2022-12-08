// import
const express = require("express")
const router = express.Router()

const userCtrl = require("../controllers/user")

const auth = require("../middleware/auth")
const permission = require("../middleware/permission")

// définition des routes
router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.delete("/login", userCtrl.logout)
router.get("/current", userCtrl.getCurrentUser)
router.put("/admin/:userId", auth, permission.userAdmin, userCtrl.adminSwitch)

module.exports = router
