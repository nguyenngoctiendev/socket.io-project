const express = require("express")
const authMiddleware = require("../middleware/auth");
const register = require("../controllers/register");
const login = require("../controllers/login");
const allUsers = require("../controllers/allUsers")
const router = express.Router();
router.route("/").post(register.register);
router.route("/login").post(login.userLogin, authMiddleware );
router.route("/all").get(allUsers);
module.exports = router;