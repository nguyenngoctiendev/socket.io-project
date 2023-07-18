const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");

//remove user from group chat
//route /api/groupchat/remove

const removeUserFromGroup = async(req, res) => {
const {roomId, userId} = req.body;
const checkAdmin = await chatModel.findByIdAndUpdate(roomId,
 {
    $pull: {
 users: userId       
    }

 }, { new: true})
 .populate("users", "-password")
 .populate("admin", "-password");
 if (!checkAdmin) {
    return res.status(400).send("Phòng chat không tồn tại")
 }
return res.status(200).json(checkAdmin)   
}

module.exports = removeUserFromGroup;
