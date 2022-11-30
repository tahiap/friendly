// import
const express = require("express")
const router = express.Router()

const permission = require("../middleware/permission")

const auth = require("../middleware/auth")
const userCtrl = require("../controllers/user")

// définition des routes
router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)
router.put("/admin/:userId", auth, permission.userAdmin, userCtrl.adminSwitch)

module.exports = router
