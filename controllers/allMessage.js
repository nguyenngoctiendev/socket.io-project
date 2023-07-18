const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");
const messageModel = require("../model/messageModel");

//get all Message
//route get /api/message/:messageId
//protected

const allMessages = async(req, res) => {
try {
const findMessage = await messageModel.find({
    chat: req.params.messageId})
    .populate("sender", "name email")
.populate("chat");
return res.json(findMessage)        
}
catch(err) {
    console.error(err.message);
    return res.status(500).send("Có lỗi xảy ra, xin vui lòng thử lại sau ít phút")
}   
}

module.exports = allMessages;