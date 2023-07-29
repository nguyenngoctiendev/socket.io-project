const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "userInfo" },
  content: { type: String, trim: true },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "userChat" },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "userInfo" }]
}, { timestamps: true }); // Thay đổi ở đây, sử dụng timestamps: true thay vì timespaps: true

const messageModel = mongoose.model("userMessage", messageSchema);

module.exports = messageModel;
