const chatModel = require("../model/chatModel");
const userModel = require("../model/userModel");
const messageModel = require("../model/messageModel");

const createMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(400).send("Data not found");
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await messageModel.create(newMessage);

    // Populate sender
    message = await messageModel.populate(message, {
      path: "sender",
      select: "name",
    });

    // Populate chat
    message = await messageModel.populate(message, {
      path: "chat",
      select: "name",
      populate: {
        path: "users",
        select: "name email",
      },
    });

    // Update latestMessage field in chatModel
    await chatModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    return res.status(200).json(message);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send("Có lỗi xảy ra, xin vui lòng thử lại sau ít phút");
  }
};

module.exports = createMessage;
