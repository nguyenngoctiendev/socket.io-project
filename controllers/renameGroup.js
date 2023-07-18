const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");

//rename group chat
//route put /api/groupchat/rename
const renameGroup = async(req, res) => {
const {roomId, roomName} = req.body;
const updateGroup = await chatModel.findByIdAndUpdate(
    roomId,
 {
    roomName: roomName

 },
 { new: true})
 .populate("users", "-password")
 .populate("admin", "-password");
 if (!updateGroup) {
    return res.status(400).send("Phòng chat không tồn tại")
 }
res.json(updateGroup)   
}

module.exports = renameGroup