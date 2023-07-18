const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes")
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser")
const app = express();
db.dbConnect();
app.use(cors());
app.use(cookieParser("userId"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes)
app.get("/running", (req, res) => {
  res.send("api running")
});

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})

const socket = require("socket.io")
const io = socket(server);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("setup", (data) => {
    socket.join(data._id)
    socket.emit("connected")
  });

  socket.on("join-chat", (chatRoom) => {
    socket.join(chatRoom);
    console.log("User joined room " + chatRoom);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop-typing", (room) => {
    socket.in(room).emit("stop-typing");
  });

  socket.on("newMessage", (message) => {
    const receiveMessage = message.chat;
    if (!receiveMessage.user) {
      console.log("User is not defined");
    }
    receiveMessage.users.forEach((user) => {
      if (user._id == message.sender._id) {
        return;
      }
      socket.in(user._id).emit("message-received");
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
