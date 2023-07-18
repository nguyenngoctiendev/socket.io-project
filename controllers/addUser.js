const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");

//add user to group or leave user
//route put /api/groupchat/adduser

const addUserToGroup = async(req, res) => {
    const {roomId, userId} = req.body;
const checkAdmin = await chatModel.findByIdAndUpdate(roomId, {
$push: {
 users: userId   
}    
}, {new: true})
.populate("users", "-password")
.populate("admin", "-password");
if (checkAdmin) {
    return res.status(400).send("Phòng chat không tồn tại")
}
return res.status(200).json(checkAdmin)   
};

module.exports = addUserToGroup;