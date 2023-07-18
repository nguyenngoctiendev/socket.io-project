const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
    chatName: {type: String, trim: true},
    groupChat: {type: Boolean, default: false},
users: [{type: mongoose.Schema.Types.ObjectId, ref: "userInfo"}],
latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "userMessage"},
groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "userInfo"}    
}, { timestamps: true});

const chatModel = mongoose.model("userChat", chatSchema);

module.exports = chatModel;