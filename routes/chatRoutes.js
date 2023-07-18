const express = require("express");
const singleChat = require("../controllers/singleChat")
const allChat = require("../controllers/allChat");
const createGroupChat = require("../controllers/createChat");
const removeFromGroup = require("../controllers/removeUser");
const addUser = require("../controllers/addUser");
const renameGroup = require("../controllers/renameGroup");
const auth = require("../middleware/auth");
const router = express.Router();
router.post("/", auth, singleChat);
router.get("/", auth, allChat);
router.post("/group", createGroupChat, auth);
router.put("/rename", auth, renameGroup);
router.put("/remove", auth, removeFromGroup);
router.put("/add", auth, addUser);

module.exports = router;