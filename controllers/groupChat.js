// groupChat.js
const mongoose = require("mongoose");
const chatModel = require("../model/chatModel");

const groupChat = async (req, res) => {
  try {
    // Sử dụng projection để chỉ lấy trường chatName
    const getGroupChat = await chatModel.find({}, { chatName: 1, _id: 0 });

    return res.status(200).json(getGroupChat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = groupChat;
