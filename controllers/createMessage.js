const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");
const messageModel = require("../model/messageModel");

//create new message
//route post /api/message

const createMessage = async(req, res) => {
const {content, chatId} = req.body;
if (!content || !chatId) {
    return res.status(400).send("Data  not found")
}
var newMessage = {
sender: req.user._id,
content: content,
chat: chatId    
};
try {
var message = await messageModel.create(newMessage);
message = await messageModel.populate("sender", "name").execPopulate();
message = await messageModel.populate("chat", "name").execPopulate();
message = await userModel.populate(message, {
    path: "chat.users",
    select: "name email"});
    await chatModel.findByIdAndUpdate(chatId, {
        latestMessage: message});
        return res.status(200).json(message)
}
catch(err) {
    console.error(err.message);
    return res.status(500).send("Có lỗi xảy ra, xin vui lòng thử lại sau ít phút")
}  
}

module.exports = createMessage;