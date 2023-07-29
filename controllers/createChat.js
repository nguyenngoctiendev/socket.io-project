const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const chatModel = require("../model/chatModel");

const createGroupChat = async (req, res) => {
  const name = req.body.name;
  const users = req.body.users;

  console.log(name);
  console.log(users);
  if (!users || !name) {
    return res.status(400).json({ err: "Please fill out the fields" });
  }
  try {
    const groupChat = await chatModel.create({
      chatName: name,
      users: users,
      groupChat: true,
      groupAdmin: req.user,
    });

    const getAllChat = await chatModel
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(getAllChat);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ err: "Có lỗi xảy ra, xin vui lòng thử lại sau ít phút" });
  }
};

module.exports = createGroupChat;
