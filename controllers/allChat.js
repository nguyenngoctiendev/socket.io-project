const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");

//get all chat for user
//route get /api/chat
//protected

const getAllChat = async(req, res) => {
    try {
        const findAllChat = await chatModel.find({
            users: { $elemMatch: { $eq: req.user._id}}
        })
        .populate("users", "-password")
        .populate("admin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1})
        .then(async(result) => {
result = await userModel.populate(result, { path: "latestMessage.sender", select: "name email"});
return res.status(200).send(result)           
        });
    }
catch(err) {
    console.error(err.message);
    return res.status(500).send("Internal server error")
}       
        
};

module.exports = getAllChat;