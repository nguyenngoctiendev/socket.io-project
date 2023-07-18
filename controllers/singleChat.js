const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");

//get single chat
//route post /api/chat
//protected

const singleChat = async(req, res) => {
    const userId = req.body.userId;
if (!userId) {
return res.status(400).send("user is not send any request");    
}
try {
    const findMessage = await chatModel.find({
groupChat: false,
$and: [
    { users: { $elemMatch:  { $eq: req.user._id}} },
    { users: { $elemMatch: { $eq: req.userId}}}
]        
    })
.populate("users", "-password")
.populate("latestMessage");
if (findMessage.length > 0) {
res.send(findMessage)[0]    
}
else {
const chatData = {
    chatName: "sender",
groupChat: false,
users: [req.user._id, userId]    
};
const createChat = await chatModel.create(chatData);
const getFullChat = await chatModel.findOne({
    _id: createChat._id
})
.populate("users", "-password")    
res.send(200).json(getFullChat)
}
}
catch(err) {
    console.error(err.message);
    return res.status(500).send("Internal server error")
}   
};


module.exports = singleChat;