const express = require("express");
const allMessage = require("../controllers/allMessage");
const createMessage = require("../controllers/createMessage");
const auth = require("../middleware/auth");
const router = express.Router();
router.get("/:messageid", auth, allMessage);
router.post("/", auth, createMessage);

module.exports = router;