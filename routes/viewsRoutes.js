const express = require("express");
const auth = require("../middleware/auth")
const router = express.Router();
router.get("/register", (req, res) => {
    res.render("register")
})
router.get("/login", (req, res) => {
    res.render("login")
})
router.get("/", auth, (req, res) => {
    res.render("home", {
        accessToken: req.session.accessToken
    })
})
module.exports = router;