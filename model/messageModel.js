const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
sender: {type: mongoose.Schema.Types.ObjectId, ref: "userInfo"},
content: {type: String, trim: true},
chat: {type: mongoose.Schema.Types.ObjectId, ref: "userChat"},
readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "userInfo"}]    
}, { timespaps: true});

const messageModel = mongoose.model("userMessage", messageSchema);

module.exports = messageModel;